import React from 'react'
import '../global'
import { web3, kit } from '../root'
import { Image, StyleSheet, Text, TextInput, Button, View, YellowBox } from 'react-native'
import {   
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
import { toTxResult } from "@celo/connect"
import * as Linking from 'expo-linking'
import FaucetContract from '../contracts/Faucet.json'

import OpenURLButton from './OpenURLButton'
import BigNumber from 'bignumber.js'

import whiteWalletRings from '../assets/white-wallet-rings.png'

YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])

// Token addresses for cGLD and cUSD on Alfajores network
// TODO: change addresses based on network env (mainnet addresses are different)
const Celo = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
const cUSD = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";


//TODO: Allow Celo component to be added to any screen as a button component
export default class CeloButtons extends React.Component {

  // Set the defaults for the state
  state = {
    address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in',
    contractName: '',
    textInput: '',
    faucetContract: {},
    faucetcUSDBalance: 'N/A',
    faucetcGLDBalance: 'N/A',
    exchangeRate: '',
    getcUSDSuccess: 'N/A',
    getcGLDSuccess: 'N/A',
  }

  // initialize contracts
  initContract = async (contract) => {
    // Check the Celo network ID
    const networkId = await web3.eth.net.getId();
    
    // Get the deployed Faucet contract info for the appropriate network ID
    const deployedNetwork = contract.networks[networkId];

    // Create a new contract instance with the Faucet contract info
    const instance = new web3.eth.Contract(
      contract.abi,
      deployedNetwork && deployedNetwork.address
    );

    return instance;
  }
  
  componentDidMount = async () => {
    const faucetContractInstance = await this.initContract(FaucetContract);

    // Save the contract instance
    this.setState({ 
      faucetContract: faucetContractInstance
    })
  }

  
  getFaucetInfo = async () => {
    let faucetAddress = this.state.faucetContract._address
    console.log(faucetAddress);

    let goldToken = await kit.contracts.getGoldToken()
    let stableToken = await kit.contracts.getStableToken()

    let faucetcGLDBalance = await goldToken.balanceOf(faucetAddress);
    let faucetcUSDBalance = await stableToken.balanceOf(faucetAddress);



    this.setState({
      faucetcGLDBalance: faucetcGLDBalance.toString(),
      faucetcUSDBalance: faucetcUSDBalance.toString()
    })
  }

  // end user sends funds to faucet
  donateToFaucet = async () => {
    console.log("donateToFaucet()")

    let donatingAccount = this.state.address
    let faucetAddress = this.state.faucetContract.options.address
    
    let amount = 10
    let goldToken = await kit.contracts.getGoldToken()
    let stableToken = await kit.contracts.getStableToken()

    console.log("got tokens")

    let celotx = await goldToken.transfer(faucetAddress, amount).send({from: donatingAccount}).catch(err => console.log("celotx ERR: ", err))
    let cUSDtx = await stableToken.transfer(faucetAddress, amount).send({from: donatingAccount, feeCurrency: stableToken.address}).catch(err => console.log("cUSDtx ERR: ", err))

    console.log("got txs")

    // TODO: Error unknown account
    let celoReceipt = await celotx.waitReceipt().catch(err => console.log("celoReceipt ERR: ", err))
    let cUSDReceipt = await cUSDtx.waitReceipt().catch(err => console.log("cusdReceipt ERR: ", err))

    console.log('CELO Transaction receipt: %o', celoReceipt)
    console.log('cUSD Transaction receipt: %o', cUSDReceipt)

    let celoBalance = await goldtoken.balanceOf(donatingAccount)
    let cUSDBalance = await stabletoken.balanceOf(donatingAccount)

    console.log(`Your new account CELO balance: ${celoBalance.toString()}`)
    console.log(`Your new account cUSD balance: ${cUSDBalance.toString()}`)

  }

  getcUSD = async () => {
    console.log("getcUSD() clicked")

    const requestId = 'withdraw_cUSD'
    const dappName = 'Green Deeds'
    const callback = Linking.makeUrl('/my/path')

    // convert user amount to wei in bignumber format
    let amount = 2 
    let weiAmount = BigNumber(amount*10e17)


    // // Create a transaction object to update the contract with the 'textInput'
    const txObject = await this.state.faucetContract.methods.withdraw(weiAmount, cUSD)

    // Send a request to the Celo wallet to send an update transaction to the Faucet contract
    requestTxSig(
      kit,
      [
        {
          from: this.state.address,
          to: this.state.faucetContract.options.address,
          tx: txObject,
          feeCurrency: FeeCurrency.cUSD
        }
      ],
      { requestId, dappName, callback }
    ).catch(err => console.log("requestTXSig Err: ", err))

    // Get the response from the Celo wallet
    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]
    
    // Get the transaction result, once it has been included in the Celo blockchain
    let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Faucet contract update transaction receipt: `, result)  
    this.getFaucetInfo()
    this.getUserBalance()
  }

  getcGLD = async () => {
    console.log("getcGLD() clicked")
    
    const requestId = 'withdraw_cGLD'
    const dappName = 'Green Deeds'
    const callback = Linking.makeUrl('/my/path')

    // convert user amount to wei in bignumber format
    let amount = 2 
    let weiAmount = BigNumber(amount*10e17)

    // // Create a transaction object to update the contract with the 'textInput'
    const txObject = await this.state.faucetContract.methods.withdraw(weiAmount, Celo)

    // Send a request to the Celo wallet to send an update transaction to the Faucet contract
    requestTxSig(
      kit,
      [
        {
          from: this.state.address,
          to: this.state.faucetContract.options.address,
          tx: txObject,
          feeCurrency: FeeCurrency.cUSD
        }
      ],
      { requestId, dappName, callback }
    ).catch(err => console.log("requestTXSig Err: ", err))

    // Get the response from the Celo wallet
    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]
    
    // Get the transaction result, once it has been included in the Celo blockchain
    let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Faucet contract update transaction receipt: `, result)  
    this.getFaucetInfo()
    this.getUserBalance()
  }

  exchange = async () => {
    console.log("test exchange contract")
    const userAddress = this.state.address

    let exchange = await kit.contracts.getExchange()

    let exchangeRate = exchange.getExchangeRate()

    // let ex = exchange.

    this.setState({
      exchangeRate
    })
  }

  login = async () => {
    
    // A string you can pass to DAppKit, that you can use to listen to the response for that request
    const requestId = 'login'
    
    // A string that will be displayed to the user, indicating the DApp requesting access/signature
    const dappName = 'Green Deeds'
    
    // The deeplink that the Celo Wallet will use to redirect the user back to the DApp with the appropriate payload.
    const callback = Linking.makeUrl('/my/path')
  
    // Ask the Celo Alfajores Wallet for user info
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    })
  
    // Wait for the Celo Wallet response
    const dappkitResponse = await waitForAccountAuth(requestId)

    // Set the default account to the account returned from the wallet
    kit.defaultAccount = dappkitResponse.address

    // Get the stabel token contract
    const stableToken = await kit.contracts.getStableToken()

    // Get the user account balance (cUSD)
    const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
    
    // Convert from a big number to a string
    let cUSDBalance = cUSDBalanceBig.toString()
    
    // Update state
    this.setState({ cUSDBalance, 
                    isLoadingBalance: false,
                    address: dappkitResponse.address, 
                    phoneNumber: dappkitResponse.phoneNumber })
  }

  getUserBalance = async () => {
    console.log("getUserBalance")

    const stableToken = await kit.contracts.getStableToken() 

    // Get the user account balance (cUSD)
    const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
    
    // Convert from a big number to a string
    let cUSDBalance = cUSDBalanceBig.toString()
    
    this.setState({ cUSDBalance })
  }

  onChangeText = async (text) => {
    this.setState({textInput: text})
  }

  render(){
    return (
      <View style={styles.container}>
        <Image resizeMode='contain' source={whiteWalletRings}></Image>
        <Text>Open up client/App.js to start working on your app!</Text>
        
        <Text style={styles.title}>Login first</Text>
        <Button title="login()" 
          onPress={()=> this.login()} />
                <Text style={styles.title}>Account Info:</Text>
        <Text>Current Account Address:</Text>
        <Text>{this.state.address}</Text>
        <Text>Phone number: {this.state.phoneNumber}</Text>
        <Text>cUSD Balance: {this.state.cUSDBalance}</Text>

        <Text style={styles.title}>Faucet Info:</Text>
        <Button title="Get Faucet Info" 
          onPress={()=> this.getFaucetInfo()} />
        <Text>cGLD Balance: {this.state.faucetcGLDBalance}</Text>
        <Text>cUSD Balance: {this.state.faucetcUSDBalance}</Text>

        <Text style={styles.title}>Withdraw from Faucet</Text>
        <Button title="Get cGLD" 
          onPress={()=> this.getcGLD()} />
        <Button title="Get cUSD" 
          onPress={()=> this.getcUSD()} />

        <OpenURLButton url="https://app.ubeswap.org/#/swap">
          Exchange cGLD for cUSD
        </OpenURLButton>

        <Text style={styles.title}>Donate to Faucet</Text>
        <Button title="Donate to Faucet" 
          onPress={()=> this.donateToFaucet()} />        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35d07f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 8, 
    fontSize: 20, 
    fontWeight: 'bold'
  }
});
