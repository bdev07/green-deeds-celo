import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../actions/AccountActions";
import { SafeAreaView, Text, View, Button } from "react-native";

import { withNavigation } from "@react-navigation/native"

const HomeScreen = ({ navigation }) => {

  const loggedIn = useSelector((state) => state.AccountReducer.loggedIn);
  const dispatch = useDispatch();

  let redeemableAmount = "$3.00"

  const logout = () => dispatch(logoutAction());
  const compost = () => navigation.navigate("Compost", { redeemableAmount: redeemableAmount });
  const recycle = () => navigation.navigate("Recycle");//, { redeemableAmount: redeemableAmount });
  const celo = () => navigation.navigate("Celo", { redeemableAmount: redeemableAmount });



  return (
    <SafeAreaView>
      <View>
        <Button title="Compost" onPress={compost} />
        <Button title="Recycle" onPress={recycle} />
        <Button title="Celo"    onPress={celo} />

        {/* <Text>Redeemable Amount: {redeemableAmount}</Text> */}

        <Button title="Logout"  onPress={logout} />


        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
