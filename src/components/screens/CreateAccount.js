import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import constants from "../../constants/constants";

const CreateAccount = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Join Voices</Text>
        <TextInput
          placeholder={"Username"}
          style={styles.inputContainer}
          placeholderTextColor="#808080"
          backgroundColor={"#FBFBFB"}
          onChangeText={setUsername}
          spellCheck={false}
          autoCapitalize={"none"}
          autoCompleteType={"off"}
        />
        <TextInput
          placeholder={"Password"}
          style={styles.inputContainer}
          placeholderTextColor="#808080"
          backgroundColor={"#FBFBFB"}
          onChangeText={setPassword}
          secureTextEntry={true}
          spellCheck={false}
          autoCapitalize={"none"}
          autoCompleteType={"off"}
        />
        <TouchableOpacity style={styles.createAccountBtn} activeOpacity={0.5}>
          <Text style={styles.createAccountText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    // justifyContent: "center",
  },
  contentContainer: {
    height: 70 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    width: "80%",
    fontSize: 35,
    margin: 5,
  },
  inputContainer: {
    height: 42,
    width: "80%",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    padding: 8,
    margin: 5,
    color: constants.styleConstants.black,
  },
  createAccountBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: constants.styleConstants.orange,
  },
  createAccountText: {
    fontSize: 20,
    color: constants.styleConstants.offWhite,
  },
});
