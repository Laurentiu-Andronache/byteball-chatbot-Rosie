'use strict';

var _package = require('./package.json');

require('byteballcore/conf.js');
require('byteballcore/wallet.js');
require('headless-byteball');
var eventBus = require('byteballcore/event_bus.js');
var device = require('byteballcore/device.js');

var Pandorabot = require('pb-node');

var bot = new Pandorabot(chatbotOptions);
var Sessions = {};

function sendGreeting(deviceAddress) {
  device.sendMessageToDevice(deviceAddress, 'text', 'Created by @la from byteball.slack.com\nOpen source: https://github.com/Laurentiu-Andronache/byteball-chatbot-Mitsuku\nVersion: ' + _package.version + '\n-------------------------------------------------------------');
}

function initiateSession(deviceAddress) {
  Sessions[deviceAddress] = {};
  Sessions[deviceAddress].PandorabotsDevice = deviceAddress.toLowerCase();
}

eventBus.on('paired', function (deviceAddress) {
  if (!Sessions[deviceAddress]) {
    sendGreeting(deviceAddress);
    initiateSession(deviceAddress);
  }
});

eventBus.on('text', function (deviceAddress, text) {
  if (!Sessions[deviceAddress]) {
    initiateSession(deviceAddress);
  }

  var talkParams = {
    client_name: Sessions[deviceAddress].PandorabotsDevice,
    input: text };
  //   console.log(`
  // talkParams.client_name: ${talkParams.client_name}
  // talkParams.input: ${talkParams.input}`);

  bot.talk(talkParams, function (err, res) {
    if (!err) {
      try {
        // console.log(`\n${res}`);
        device.sendMessageToDevice(deviceAddress, 'text', res.responses[0]);
      } catch (e) {
        console.log('\n' + e);
      }
    } else {
      console.log('\n' + err);
    }
  });
});

//# sourceMappingURL=start-compiled.js.map