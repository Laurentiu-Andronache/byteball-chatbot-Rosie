// import { version } from './package.json';

require('byteballcore/conf.js');
require('byteballcore/wallet.js');
const headlessWallet = require('headless-byteball');
const eventBus = require('byteballcore/event_bus.js');
const device = require('byteballcore/device.js');

headlessWallet.setupChatEventHandlers();

const chatbotPrivateKeys = require('./chatbotPrivateKeys');
const Pandorabot = require('pb-node');

const bot = new Pandorabot(chatbotPrivateKeys);
const Sessions = {};

function sendGreeting(deviceAddress) {
  device.sendMessageToDevice(deviceAddress, 'text',
`Created by @la from byteball.slack.com
Open source: https://github.com/Laurentiu-Andronache/byteball-chatbot-Mitsuku
Version: 0.0.1
-----------------------------------------------------------------------------`);
}
// ${version}

function initiateSession(deviceAddress) {
  Sessions[deviceAddress] = {};
  Sessions[deviceAddress].InitializationTimestamp = Date.now();
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
    sessionid: deviceAddress,
    input: text };

  bot.talk(talkParams, (err, res) => {
    if (!err) {
      device.sendMessageToDevice(deviceAddress, 'text', res);
    }
  });
});
