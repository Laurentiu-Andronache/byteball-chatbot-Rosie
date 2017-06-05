# Byteball Rosie (chatbot)



## What is this?
This is a conversational AI, available for the [Byteball network](https://byteball.org). At the moment it's serving [Rosie](https://github.com/pandorabots/rosie) through [Pandorabots' API](https://developer.pandorabots.com), but without modifying the code you can serve any other AIML-compliant chatbot.


## Features
It saves sessions! It will remember you on each device. You can easily test this; for example pair with it from multiple devices and introduce yourself through a different name on each one. Then ask him what's your name, even at weeks apart, and it will remember you on each device separately.


## How to pair with this bot in the Byteball mainnet
* to add address and QR code here


## Development environment

For development I used Windows 10, WebStorm 2017 and Node 8. The WebStorm configuration is included in the .idea folder. There's a Babel watcher because I wanted to use all ECMAScript 6 features (for example importing from a JSON file).

Code beauty is assured using Airbnb's ESLint configuration.

## How to run this in the Byteball testnet

1. In conf.js make sure you have this hub selected:
```
exports.hub = 'byteball.org/bb-test';
```
2. Run this command:
```
sed -ie "s/version = '1.0'/version = '1.0t'/; s/alt = '1'/alt = '2'/" node_modules/byteballcore/constants.js
```
3. Create an account with https://developer.pandorabots.com. We will use their API to upload on their server Rosie, which is a chatbot base, then compile it and make it available for each user on a different session.
4. Install Pandorabots CLI (we'll use this to interact with their API from the command line). Then use it to create a chatbot.json file that will be used for API authentication by both this client and our project.
```
$ npm install -g pb-cli
...
$ pb init
app_id? (required) *********
user_key? (required) ********
botname? (recommended) rosie
hostname? (optional)
```
Make sure that the newly created chatbot.json is also available in the same directory as start.js.
5. Download Rosie's source files, then create a new bot on the server and upload Rosie, then (optionally) remove the downloaded files since they won't be needed and compile the bot:
```
$ git clone https://github.com/pandorabots/rosie
...
$ pb create rosie
ok
$ pb push rosie/lib/aiml/
...
$ pb push rosie/lib/maps/
...
$ pb push rosie/lib/sets/
...
$ pb push rosie/lib/substitutions/
...
$ pb push rosie/lib/system/
...
$ rm -fr rosie/
$ pb compile
ok
```
6. Test Rosie:
```
$ pb talk "Hi. What is your name?"
Hi nice to see you!
I am called Rosie.
```
7. Put start.js through Babel, then run the compiled version!
```
$ ./node_modules/.bin/babel.cmd start.js --out-file start-compiled.js --source-maps --presets env
$ node start-compiled.js
```
On Linux, you would replace in the above command "babel.cmd" with "babel".

## Donations address

![7N6RHAKVPHXZR6OXQNGHQKWMM7RSGWAQ](https://raw.githubusercontent.com/Laurentiu-Andronache/byteball-chatbot-Rosie/master/.idea/myqrcode.png "7N6RHAKVPHXZR6OXQNGHQKWMM7RSGWAQ") | 7N6RHAKVPHXZR6OXQNGHQKWMM7RSGWAQ (Byteball address)
--- | ---

Funds go towards:

* hosting

* Pandorabots' API subscription

* my time for developing more open source and well documented bots for the Byteball network

## Contact me

You may contact me through Byteball's Slack:

http://slack.byteball.org

My username is @la