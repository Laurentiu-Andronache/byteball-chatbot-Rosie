# Byteball Mitsuku (chatbot)



## What is this?
Mitsuku! Your friend!


## Features
- saves sessions


## How to run this in the Byteball testnet:
1. in conf.js make sure this is the hub selected:
```
exports.hub = 'byteball.org/bb-test';
```
2. run this command:
```
sed -ie "s/version = '1.0'/version = '1.0t'/; s/alt = '1'/alt = '2'/" node_modules/byteballcore/constants.js
```


## How to pair with this bot in the Byteball mainnet:
I'm a shitty programmer. This ain't done yet.