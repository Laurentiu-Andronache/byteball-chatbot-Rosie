import { version } from './package.json';
import * as chatbotOptions from './chatbot.json';

require('byteballcore/conf.js');
require('byteballcore/wallet.js');
require('headless-byteball');
const eventBus = require('byteballcore/event_bus.js');
const device = require('byteballcore/device.js');

const Pandorabot = require('pb-node');

const bot = new Pandorabot(chatbotOptions);
const Sessions = {};


function sendGreeting(deviceAddress) {
  device.sendMessageToDevice(deviceAddress, 'text',
      `Created by @la from byteball.slack.com
Open source: https://github.com/Laurentiu-Andronache/byteball-chatbot-Mitsuku
Version: ${version}
-------------------------------------------------------------`);
}


function initiateSession(deviceAddress) {
  Sessions[deviceAddress] = {};
  Sessions[deviceAddress].PandorabotsDevice = deviceAddress.toLowerCase();
}


eventBus.on('paired', (deviceAddress) => {
  if (!Sessions[deviceAddress]) {
    sendGreeting(deviceAddress);
    initiateSession(deviceAddress);
  }
});


eventBus.on('text', (deviceAddress, text) => {
  if (!Sessions[deviceAddress]) {
    initiateSession(deviceAddress);
  }

  const talkParams = {
    client_name: Sessions[deviceAddress].PandorabotsDevice,
    input: text };
//   console.log(`
// talkParams.client_name: ${talkParams.client_name}
// talkParams.input: ${talkParams.input}`);

  bot.talk(talkParams, (err, res) => {
    if (!err) {
      try {
        // console.log(`\n${res}`);
        device.sendMessageToDevice(deviceAddress, 'text', res.responses[0]);
      } catch (e) {
        console.log(`\n${e}`);
      }
    } else {
      console.log(`\n${err}`);
    }
  });
});
