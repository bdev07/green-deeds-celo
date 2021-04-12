# Green Deeds

Currently working on the [Alfajores test network](https://docs.celo.org/getting-started/alfajores-testnet).


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