import React from 'react'
import '../global'
import { web3, kit } from '../root'
import { Alert, Image, StyleSheet, Text, TextInput, Button, View, YellowBox, ScrollView } from 'react-native'
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

import OpenURLButton from '../components/OpenURLButton'
import BigNumber from 'bignumber.js'

import whiteWalletRings from '../assets/white-wallet-rings.png'
import { useDispatch } from 'react-redux'

YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])

// Token addresses for cGLD and cUSD on Alfajores network
// TODO: change addresses based on network env (mainnet addresses are different)
const Celo = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
const cUSD = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";


export default class CeloScreen extends React.Component {
  _isMounted = false

  // Set the defaults for the state
  state = {
    loggedIn: false,
    address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in',
    cGLDBalance: 'Not logged in',
    faucetContract: {},
    faucetAddress: '',
    faucetcUSDBalance: 'N/A',
    faucetcGLDBalance: 'N/A',
    exchangeRate: '',
    donateAmount: '1',
    redeemableAmount: this.props.route.params ? this.props.route.params.redeemableAmount : '0',
    withdrawAmount: this.props.route.params ? this.props.route.params.redeemableAmount : '0',
    isLoadingBalance: false
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
    this._isMounted = true
    const faucetContractInstance = await this.initContract(FaucetContract)

    // Save the contract instance
    this.setState({ 
      faucetContract: faucetContractInstance
    })
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  getFaucetInfo = async () => {
    let faucetAddress = this.state.faucetContract._address

    let goldToken = await kit.contracts.getGoldToken()
    let stableToken = await kit.contracts.getStableToken()

    let faucetcGLDBalance = await goldToken.balanceOf(faucetAddress)
    let faucetcUSDBalance = await stableToken.balanceOf(faucetAddress)

    if (this._isMounted === true) {
      this.setState({
        faucetAddress: faucetAddress,
        faucetcGLDBalance: faucetcGLDBalance.toString(),
        faucetcUSDBalance: faucetcUSDBalance.toString()
    })
    }

  }

  // end user sends funds to faucet
  donateToFaucet = async () => {
    console.log("donateToFaucet()")
    const requestId = 'donate_celo'
    const dappName = 'Green Deeds'
    const callback = Linking.makeUrl('/my/path')
    
    let amount = parseFloat(this.state.donateAmount)
    let weiAmount = BigNumber(amount*10e17)

    const txObject = await this.state.faucetContract.methods.donate()

    requestTxSig(
      kit,
      [
        {
          from: this.state.address,
          to: this.state.faucetContract.options.address,
          tx: txObject,
          value: weiAmount,
          feeCurrency: FeeCurrency.cUSD
        }
      ],
      { requestId, dappName, callback }
    )

    // Get the response from the Celo wallet
    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]
    
    // Get the transaction result, once it has been included in the Celo blockchain
    let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Faucet contract update transaction receipt: `, result.transactionHash) 
    Alert.alert("Donation complete!", `Tx Hash: ${result.transactionHash}`)

    this.getFaucetInfo()
    this.getUserBalance()
    this.setState({ donateAmount: "0" })
  }

  getcUSD = async () => {
    console.log("getcUSD() clicked")

    const requestId = 'withdraw_cUSD'
    const dappName = 'Green Deeds'
    const callback = Linking.makeUrl('/my/path')

    // convert user amount to wei in bignumber format
    let amount = parseFloat(this.state.withdrawAmount)
    let weiAmount = BigNumber(amount*10e17)

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

    console.log(`Faucet contract update transaction receipt: `, result.transactionHash)  
    Alert.alert("Transaction Complete!",
    `Tx Hash: ${result.transactionHash}`
    )
    this.getFaucetInfo()
    this.getUserBalance()
    this.setState({ withdrawAmount: "0" })
  }

  getcGLD = async () => {
    console.log("getcGLD() clicked")
    
    const requestId = 'withdraw_cGLD'
    const dappName = 'Green Deeds'
    const callback = Linking.makeUrl('/my/path')

    // convert user amount to wei in bignumber format
    let amount = parseFloat(this.state.withdrawAmount)
    let weiAmount = BigNumber(amount*10e17)

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
    ).catch(err => console.log("requestTXSig Err: ", err ))

    // Get the response from the Celo wallet
    const dappkitResponse = await waitForSignedTxs(requestId)
    const tx = dappkitResponse.rawTxs[0]
    
    // Get the transaction result, once it has been included in the Celo blockchain
    let result = await toTxResult(kit.web3.eth.sendSignedTransaction(tx)).waitReceipt()

    console.log(`Faucet contract update transaction receipt: `, result.transactionHash)  
    Alert.alert("Transaction Complete!",
      `Tx Hash: ${result.transactionHash}`
    )
    this.getFaucetInfo()
    this.getUserBalance()
    this.setState({ withdrawAmount: "0" })
  }

  //TODO: allow exchanges inside the app
  exchange = async () => {
    console.log("test exchange contract")
    const userAddress = this.state.address

    let exchange = await kit.contracts.getExchange()

    let exchangeRate = exchange.getExchangeRate()

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
    const goldToken = await kit.contracts.getGoldToken()

    // Get the user account balance (cUSD)
    const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
    const cGLDBalanceBig = await goldToken.balanceOf(kit.defaultAccount)

    // Convert from a big number to a string
    let cUSDBalance = cUSDBalanceBig.toString()
    let cGLDBalance = cGLDBalanceBig.toString()

    this.getFaucetInfo()

    // Update state
    this.setState({ 
      cUSDBalance, cGLDBalance,
      isLoadingBalance: false,
      address: dappkitResponse.address, 
      phoneNumber: dappkitResponse.phoneNumber,
      loggedIn: true 
    })
  }

  getUserBalance = async () => {
    console.log("getUserBalance")

    const stableToken = await kit.contracts.getStableToken() 

    // Get the user account balance (cUSD)
    const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
    
    // Convert from a big number to a string
    let cUSDBalance = cUSDBalanceBig.toString()
    
    if (this._isMounted === true) {
      this.setState({ cUSDBalance })
    }

  }

  onChangeWithdraw = async (number) => {

    if (number <= this.state.redeemableAmount){
      this.setState({ withdrawAmount: number })
    } else {
      Alert.alert(
        "Insufficient Credit",
        `There is only ${this.state.redeemableAmount} available to withdraw.`
      )
    }
  }

  onChangeDonate = async (number) => {
    this.setState({ donateAmount: number })
  }

  render(){
    let { withdrawAmount, redeemableAmount } = this.state
    let disabled = withdrawAmount > 0 ? false : true

    return (
      
      <View style={styles.container}>
        <Image resizeMode='contain' source={whiteWalletRings}></Image>
        
        {
          this.state.loggedIn === false ? (
            <>
            <Text>You must have Celo Wallet (alfajores network) installed!</Text>
              <Text style={styles.title}>Login to Celo!!</Text>
              <Button title="Login" 
                onPress={()=> this.login()} />
              <Text></Text>
              <Text>Please download the Celo Wallet to continue.</Text>
              <OpenURLButton url="https://celo.org/developers/wallet">
                Download Wallet
              </OpenURLButton>
            </>
          ) : (
            <ScrollView>
              <Text style={styles.title}>Account Info:</Text>
              <Text>Your Account Address:</Text>
              <Text>{this.state.address}</Text>
              <Text>Phone number: {this.state.phoneNumber}</Text>
              <Text>Celo Balance: {this.state.cGLDBalance}</Text>
              <Text>cUSD Balance: {this.state.cUSDBalance}</Text>
              <Text>Redeemable Amount: {redeemableAmount}</Text>

              <Text style={styles.title}>Withdraw {this.state.withdrawAmount} from Faucet</Text>
              <Text>You can redeem up to ${redeemableAmount}.</Text>
              <TextInput
                style={styles.input}
                onChangeText={this.onChangeWithdraw}
                value={this.state.withdrawAmount}
                placeholder="Amount to Withdraw"
                keyboardType="numeric"
              />

              <Button title="Get cUSD" 
                onPress={()=> this.getcUSD()} 
                disabled={disabled} 
              />
              <Text></Text>
              <OpenURLButton url="https://app-alfajores.ubeswap.org/">
                Exchange cUSD for Celo gold!
              </OpenURLButton>


              <Text style={styles.title}>Green Deeds Faucet Balance:</Text>
              <Text>Contract Address: {this.state.faucetAddress}</Text>
              <Text>Celo Balance: {this.state.faucetcGLDBalance}</Text>
              <Text>cUSD Balance: {this.state.faucetcUSDBalance}</Text>

              <TextInput
                style={styles.input}
                onChangeText={this.onChangeDonate}
                value={this.state.donateAmount}
                placeholder="Amount to Donate"
                keyboardType="numeric"
              />

              <Button title="Donate Celo to Faucet" 
                onPress={()=> this.donateToFaucet()} />     
            </ScrollView>
          )
        }

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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  }
});
