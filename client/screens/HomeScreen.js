import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../actions/AccountActions";
import { SafeAreaView, Text, View, Button } from "react-native";

import { withNavigation } from "@react-navigation/native"

const HomeScreen = ({ navigation }) => {

  const loggedIn = useSelector((state) => state.AccountReducer.loggedIn);
  const dispatch = useDispatch();

  const logout = () => dispatch(logoutAction());
  const compost = () => navigation.navigate("Compost");
  const recycle = () => navigation.navigate("Recycle");
  const celo = () => navigation.navigate("Celo");



  return (
    <SafeAreaView>
      <View>
        <Button title="Compost" onPress={compost} />
        <Button title="Recycle" onPress={recycle} />
        <Text></Text>
        <Button title="Celo"    onPress={celo} />
        <Text></Text>
        <Button title="Logout"  onPress={logout} />


        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
