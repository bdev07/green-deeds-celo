import React from "react";
import { SafeAreaView, Button, Text, View } from "react-native"

export default class CompostScreen extends React.Component {
  state = {
    composted: 0,
    redeemableAmount: "0.00"  //route.params !== undefined ? route.params.redeemableAmount : "0.00"
  }

  photo = () => this.props.navigation.navigate("Camera")
  celo = () => this.props.navigation.navigate("Celo", { redeemableAmount: this.state.redeemableAmount });
  

  photoPressed = () => {
    this.setState({
      composted: 3,
      redeemableAmount: "3.00"
    })

  }

  render() {
    return (
      <SafeAreaView>
        <Button title="Scan Receipt" onPress={this.photoPressed} />
  
          <View>
            <Text>Bags of compost: {this.state.composted}</Text>

            <Text>Redeemable Amount: ${this.state.redeemableAmount} </Text>
            <Button title="Redeem for Celo Dollars" onPress={this.celo} />
          </View>

      </SafeAreaView>
    );
  }
};


