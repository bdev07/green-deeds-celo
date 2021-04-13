import React from "react"
import { SafeAreaView, Button, Text, View } from "react-native"

export default class RecycleScreen extends React.Component {
  state = {
    recycled: 0,
    redeemableAmount: "0.00"  //route.params !== undefined ? route.params.redeemableAmount : "0.00"
  }

  photo = () => this.props.navigation.navigate("Camera")
  celo = () => this.props.navigation.navigate("Celo", { redeemableAmount: this.state.redeemableAmount });
  

  photoPressed = () => {
    this.setState({
      recycled: 3,
      redeemableAmount: "3.00"
    })

  }

  render() {
    return (
      <SafeAreaView>
        <Button title="Scan Receipt" onPress={this.photoPressed} />
  
          <View>
            <Text>Bottles Recycled: {this.state.recycled}</Text>

            <Text>Redeemable Amount: ${this.state.redeemableAmount} </Text>
            <Button title="Redeem for Celo Dollars" onPress={this.celo} />
          </View>

      </SafeAreaView>
    );
  }

}

