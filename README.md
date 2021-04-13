# Green Deeds Celo Hackathon Submission:

Link to our full presentation: [Presentation] (tinyurl.com/238wjhvj_

Link to our video demo(s): 
- [Recycling and Ubeswap](https://youtu.be/ja_fWc7RCmk)


This app has been tested on the [Alfajores test network](https://docs.celo.org/getting-started/alfajores-testnet).


## What does DeFi look like when it's designed for mobile-first?


Mobile first decentralized finance makes the blockchain more user friendly.  This makes it easier to incentivize users to utilize a blockchain ledger.  Green Deeds hopes to take advantage of the ease of mobile-first to help incentivize businesses and individuals to recycle and recycle correctly.  

This question is also answered in our full presentation, found [here].

## Green Deeds potential for impact:
Green Deeds hopes to revolutionize how we think about food waste and plastics by creating an efficient decentralized recycling of resources.  

We hope to minimize the need for raw materials by keeping existing assets in the production cycle.  

Investors or any business that uses recyclable materials like compost or empty bottles can donate to the Green Deeds funds.  Those funds then go to businesses or individuals who have done a greed deed by recycling or composting. 

Our [demo](https://youtu.be/ja_fWc7RCmk) shows a proof of concept for an end user wishing to recycle 3 bottles and redeem their rewards for celo dollars.  Those dollars can then be exchanged for celo gold using Ubeswap. 

This question is also answered in our full presentation, found [here].

#

# Green Deeds

## Server Requirements

- [Node.js](https://nodejs.org/en/)
\>=14.16.0
- [Yarn package manager](https://yarnpkg.com/)
\>=1.22.4
- [Expo](https://docs.expo.io/get-started/installation/)
4.3.5
- [Truffle](https://www.trufflesuite.com/truffle)
(only needed for smart contract development)

## Phone Requirements

- [Expo Go](https://expo.io/client)
- [Celo Wallet](https://celo.org/developers/wallet)

You will need the Expo app installed on your development mobile device or emulator ([iOS](https://apps.apple.com/app/apple-store/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)). 

You will also need the [Celo Wallet](https://celo.org/developers/wallet) on your mobile device (or emulator) to sign transactions. 

## To Run a Demo

The project smart contracts and configuration are in the root directory. The React Native front end is in the `/client` directory. 

To run the app from expo, first install dependencies.

```bash
yarn       # install depenedncies
cd client  # move into the client directory
yarn       # install front end dependencies
```

Then start expo.
```bash
cd client  # move into the client directory
expo start # run a demo in expo
```


## Smart contract development

The box is configured to deploy Solidity smart contracts to the Alfajores test network. You will need test network funds to deploy your own contract. 

To create a new account for development, in the project root run

```bash
yarn account
```

The new account address will be printed in the console. This script will generate a private key for you and store it in `/.secret`. If you need to print the account info again, run `yarn account` again. It will not create a new account, it will read the saved private key and print the corresponding account address. 

Truffle will read this private key for contract deployments. 

Copy your account address and paste it in to the [Alfajores faucet](https://celo.org/developers/faucet) to fund your account.

You can migrate contracts to the alfajores test network with

```bash
truffle migrate --network alfajores
```


## Initial boilerplate for Celo aspect of project

```bash
truffle unbox critesjosh/celo-dappkit
``` 

## Sources:

[Celo Docs](https://docs.celo.org/) 

[Running an Android emulator](https://developer.android.com/studio/run/emulator-commandline)

[Expo](https://expo.io/learn)

[Celo Test Wallet](https://celo.org/developers/wallet) 

[Base Project](https://github.com/critesjosh/celo-dappkit)
