import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { loginAction } from "../actions/AccountActions";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Image,
  SafeAreaView,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const RegisterScreen = ({ navigation }) => {
  const loggedIn = useSelector((state) => state.AccountReducer.loggedIn);
  const dispatch = useDispatch();
  const login = () => dispatch(loginAction());

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.registerContainer}>
        <TextInput style={styles.input} placeholder="username or email" />

        <TextInput style={styles.input} placeholder="password" />

        <TouchableOpacity style={styles.registerButton} onPress={login}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#27ce7f",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    width: 350,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  registerButton: {
    height: 40,
    backgroundColor: "#0052ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "white",
    fontSize: 18,
  },
  registerContainer: {
    position: "absolute",
    top: 500,
    height: 150,
    justifyContent: "space-around",
  },
});

export default RegisterScreen;
