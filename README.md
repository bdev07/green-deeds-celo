# Green Deeds

Currently working on the [Alfajores test network](https://docs.celo.org/getting-started/alfajores-testnet).

Most of this readme file is copied from: https://github.com/critesjosh/celo-dappkit

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn package manager](https://yarnpkg.com/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Expo](https://docs.expo.io/get-started/installation/)
- [Celo Wallet](https://celo.org/developers/wallet)

## Initial boilerplate for Celo aspect of project

```bash
truffle unbox critesjosh/celo-dappkit
``` 

## Development

The project smart contracts and configuration are in the root directory. The React Native front end is in the `/client` directory. 

To run the app from expo first install dependencies.

```bash
yarn       # install depenedncies
cd client  # move into the client directory
yarn       # install front end dependencies
expo start # run a demo in expo
```

## Mobile Dependencies

You will need the Expo app installed on your development mobile device or emulator ([iOS](https://apps.apple.com/app/apple-store/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)). 

You will also need the [Celo Wallet](https://celo.org/developers/wallet) on your mobile device (or emulator) to sign transactions. 

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

## Developing the mobile application

Keep in mind that you will need a version of the Celo Wallet installed on the mobile device with which you are developing the application. The Celo Wallet is the private key management software that the user will sign transactions with. 

You can install the Celo wallet on your physical device with an invite code [here.](https://celo.org/developers/wallet) 

You can build the latest version of the Celo Wallet and find instructions on running a development build [here.](https://github.com/celo-org/celo-monorepo/tree/master/packages/mobile) 

Once you have a device with the Celo wallet installed, you can start working on your application. 


### Application development with Expo

In this project, the React Native application lives in the `client` directory. `cd` into the client directory and run `$ yarn` to install the dependencies. 

[Expo](https://expo.io/) is a tool that makes developing React Native applications much easier. We will be using Expo for easy setup.

Install it with:
```
yarn global add expo-cli
# or
npm install --global expo-cli
```

You can start the application from the client directory with
```
expo start
```

You can use your physical mobile device or an emulator to develop apps with Expo. If you want to use your physical device, you will have to [install the Expo app on your device.](https://expo.io/learn)

Make sure the Celo Wallet app is open on your device when you are using your dapp. Your dapp will be requesting information from the Celo Wallet.

### Using an emulator

You can find more information about running and Android emulator [here.](https://developer.android.com/studio/run/emulator-commandline)


## Sources:

[Celo Docs](https://docs.celo.org/) 
