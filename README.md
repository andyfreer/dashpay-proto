
#DashPay (Prototype)

DashPay enables decentralized online payments with the Dash cryptocurrency from any device, using a REST based API decentralized across 3,500 dedicated Dash Masternodes in the Dash P2P network.

DashPay is part of Dash's upcoming version, Evolution, and also includes social and usability features to make cryptocurrencies easier to use with friends.

To learn more about Dash Evolution check the [documentation](https://www.dash.org/evolution/) or visit [www.dash.org](http://www.dash.org).

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
[DashPay-Wallet-SDK-JS](#)   |  Client SDK for building DashPay wallets, will include Browser SPV
[DashPay-Charge-SDK-JS](#)  | Merchant SDK for adding decentralized Dash payments and charges to web applications.
[DashPay-HTML-Wallet](#)  | Single-Page HTML DashPay Wallet client that connects to DashPay Nodes using D-API

Note that projects are laid out in a client-server style architecture that's familiar to most web and app developers even though the 'server' part is provided by the decentralized Dash network.  

    ├── client                      
    │   ├── dashpay-html-wallet          
    ├── lib                    
    │   ├── dashpay-lib          
    │   ├── dashpay-checkout-sdk         
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


##Getting Started

Make sure you have Grunt installed first:
```
npm install grunt -g
npm install grunt-cli -g
```

Then the fastest way to get started is run the main project build scripts in the root.  That will install and build each sub-project folder:

```
$ npm run install
$ npm run build
$ npm run start
```
Alternatively you can build each project individually using the same commands in each sub project folder.

After building, the libs and clients should have created the distribution files in sub-project's ./build folders.

###Running the client
With the server node running, you can test the D-API b opening the built HTML file in a web browser:
```
├── client                      
    ├── dashpay-wallet-html          
       ├── build  
          ├── dashpay-wallet-proto.html           
```








 


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

