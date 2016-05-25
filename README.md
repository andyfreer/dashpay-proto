
#DashPay (Prototype)

DashPay enables decentralized online payments with the Dash cryptocurrency from any device, using a REST based API decentralized across [3,800 Masternodes](http://178.254.23.111/~pub/masternode_count.png)  in the Dash P2P network.

DashPay is part of Dash's upcoming version, Evolution, and also includes social and usability features to make cryptocurrencies easier to use and available from any device.

To learn more about Dash Evolution check the [documentation](https://www.dash.org/evolution/) or visit [www.dash.org](http://www.dash.org).

##Getting Started

DashPay is written entirely in JavaScript and requires NodeJS to be installed on your machine to develop with the decentralized API locally.  For Windows users, also make sure you have a BASH client installed such as Git-bash so you can use the setup scripts.

To get started, make sure you have Grunt & Gulp installed first:
```
$ npm install grunt-cli -g
$ npm install gulp-cli -g
```
Then run the setup script to install and build all projects.  You can also use this script later to reset the project to it's initial state and reinstall/rebuild everything if you have build issues or new packages have been added to the source.
```
$ sudo npm run setup
```
Next, generate test SSL keys or copy your own to the folder [server/dashpay-dapi-node/ssl]
```
$ npm run genkeys
```
Start the node server
```
$ npm run start
```

To test you can access the API, visit [https://localhost:8080/ping](https://localhost:8080/ping) in your browser and you should see the response "pong".  

If you get a certificate error with your generated SSL keys, add an exception to your browser to allow them.

###Running the client
After building and starting the node app, open the built HTML file in a web browser:
```
├── client                      
    ├── dashpay-spa          
       ├── dist  
          ├── DashPay.html
```

## Project Status

The current status of the project **is just a protoype** and most of the **security and privacy features have not been added**.  

In the prototype the frontend is connecting to a single development Masternode, who's backend is connecting to a single test database instead of a decentralized DashDrive implementation, which is not at prototype stage yet.  

That means don't ever try to spend actual Dash funds using the prototype and don't submit any data that you don't mind losing / sharing until the system is more mature.

##Project Structure
This project contains for various sub-projects that will comprise the frontend (Tier 3) of Dash Evolution.

Later, sub-projects will be moved to their own repos, but in this early prototype stage, it's easier to have everything under one project.

Project     | Purpose 
-------- | ----- 
[DashPay-DAPI-Node](#) |  The Node application providing the Decentalized API (D-API) on Masternodes
[DashPay-Lib-JS](#)  | Dash Evolution T3 Javascript library, includes Bitcore for Tier 2 functions
[DashPay-Wallet-SDK-JS](#)   |  SDK for building DashPay client wallets, will include Browser SPV
[DashPay-Wallet-Client-JS](#)   |  Promise API Client for the SDK
[DashPay-Checkout-SDK-JS](#)  | Merchant SDK for adding decentralized Dash payments and charges to web applications.
[DashPay-HTML-Wallet](#)  | Single-Page HTML Wallet using the Wallet SDK (Deprecated)
[DashPay-SPA](#)  | Single-Page HTML App built on Backbone/Marionette using the Wallet Client

Note that projects are laid out in a client-server style architecture that's familiar to most web and app developers even though the 'server' part is provided by the decentralized Dash network.  

    ├── client                      
    │   ├── dashpay-html-wallet      
    │   ├── dashpay-spa      
    ├── lib                    
    │   ├── dashpay-lib          
    │   ├── dashpay-checkout-sdk 
    │   ├── dashpay-wallet-client          
    │   └── dashpay-wallet-sdk
    ├── server                    
    │   ├── dashpay-dapi-node


###DashPay Libraries

DashPay-Lib is the main library for Dash Evolution and is shared between client and server projects.  It provides end-user and merchant orientated functions for accessing Dash Evolution.  

DashPay-Lib depends on and wraps the entire Dashified Bitcore library that is referenced from the following external repositories:

Lib     | Features 
-------- | ----- 
[bitcore-lib-dash](https://github.com/andyfreer/bitcore-lib-dash) |  Main Bitcore library
[bitcore-ecies-dash](https://github.com/andyfreer/bitcore-ecies-dash)  | ECIES encryption using a symmetric cipher and a random key.
[bitcore-message-dash](https://github.com/andyfreer/bitcore-message-dash)   |  Message signing & verification functions
[bitcore-mnemonic-dash](https://github.com/andyfreer/bitcore-mnemonic-dash)  |  Mnemonic sentence generation for the generation of deterministic keys 


##DAuth (Prototype)

This is an initial idea for DAuth that is the protocol that will be used for authentication between Evolution T3 nodes.

HTTP agents can establish an authentication session through mutual-authentication via decentalized oracles, message signing and verification and ECIES encryption using public keys.  Once both parties (e.g. client and masternode) have authenticated *each other*, they communicate through a secure channel where each message has to incorporate a deterministic challenge in the payload derived from an HD seed provided on session initiation with all messages signed by and encrypted for the other party to prevent MITM and Spoofing attacks.

###Session Authentication

```sequence
Decentralized Oracle 1-> Alice: Fetch Bob's Public Key
Alice->Bob: (A) Encrypted challenge, signed
Note right of Bob: Decrypt, verify ID
Decentralized Oracle 2-->Bob: Fetch Alice's Public Key 
Bob-->Alice: (B) Encrypted response & counter-challenge, signed
Note left of Alice: Decrypt, verify ID & response 
Alice->Bob: (C) Encrypted response (sequence), signed
Note right of Bob: Decrypt, verify ID & response 
Bob-->Alice: (D) Encrypted response (sequence), signed
```
Note: Typically Alice would be an Evolution client like a web browser and Bob would be a Masternode, but these roles are not hardcoded into the protocol.


### Web-Quorum Discovery

Below is the process whereby Evolution clients can discover Masternode details to connect to or rather the clusters of masternodes that deal will deal with their requests at any given time, aka a web quorum.  This is the 'decentralized oracle' used in the first stage of the above sequence diagram.

Clients need to be able to know the IP, VINs and public keys of the masternodes in the client-user's quorum.
Quorums are deterministically selected for the user and the user has affinity to the quorum masternodes for the length of the quorum.

```sequence
User Agent->RR_DNS: resolve api.dash.org
RR_DNS-->User Agent: Random MN IPs, VINs and pubkeys
Note left of User Agent: Cross-reference IPs
User Agent->Masternodes: Request Cluster (username)
Masternodes-->User Agent: Web-Quorum IPs, VINs and pubkeys
Note left of User Agent: Verify MN sigs

```

