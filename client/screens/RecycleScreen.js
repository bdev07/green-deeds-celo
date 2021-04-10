import React from "react";
import { SafeAreaView, Button } from "react-native";

const RecycleScreen = ({ navigation }) => {
  const photo = () => navigation.navigate("Camera");

  return (
    <SafeAreaView>
      <Button title="Take Photo" onPress={photo} />
    </SafeAreaView>
  );
};

export default RecycleScreen;
