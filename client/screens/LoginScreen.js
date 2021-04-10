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
  ScrollView,
  Platform
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const loggedIn = useSelector((state) => state.AccountReducer.loggedIn);
  const dispatch = useDispatch();
  const login = () => dispatch(loginAction());

  return (
    <SafeAreaView >
      <View style={styles.background}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/Logo.png")} style={styles.logo} />
          <Text style={styles.logoText}>Turn trash into gold!</Text>
        </View>
        
        <View style={styles.loginContainer}>
        <ScrollView>
          <TextInput style={styles.input} placeholder="username or email" />

          <TextInput style={styles.input} placeholder="password" />

          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <Button
              title="Register"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
          </ScrollView>
        </View>
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
  logo: {
    width: 300,
    height: 300,
  },
  logoText: {
    color: "#e4a914",
    fontSize: 36,
  },
  logoContainer: {
    position: "absolute",
    top: 75,
    alignItems: "center",
  },
  input: {
    width: 350,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  loginButton: {
    height: 40,
    backgroundColor: "#0052ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 18,
  },
  loginContainer: {
    position: "absolute",
    top: 500,
    height: 200,
    justifyContent: "space-around",
  },
  registerText: {
    fontSize: 16,
    top: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
  },
});

export default LoginScreen;
