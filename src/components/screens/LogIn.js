import React from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import constants from "../../constants/constants";
import CreateAccount from "./CreateAccount";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  _validate_fields(username, password) {
    if (username == "") {
      alert("Please input username");
      return false;
    } else if (password == "") {
      alert("Please input password");
      return false;
    }
    // add in check for unique username
    return true;
  }

  _login() {
    username = this.state.username;
    password = this.state.password;
    if (this._validate_fields(username, password) == false) return;
    // call api
    return;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Log In</Text>
          <TextInput
            placeholder={"Username"}
            style={styles.inputContainer}
            placeholderTextColor="#808080"
            backgroundColor={"#FBFBFB"}
            onChangeText={(input) => this.setState({ username: input })}
            spellCheck={false}
            autoCapitalize={"none"}
            autoCompleteType={"username"}
          />
          <TextInput
            placeholder={"Password"}
            style={styles.inputContainer}
            placeholderTextColor="#808080"
            backgroundColor={"#FBFBFB"}
            onChangeText={(input) => this.setState({ password: input })}
            secureTextEntry={true}
            spellCheck={false}
            autoCapitalize={"none"}
            autoCompleteType={"password"}
          />
          <TouchableOpacity
            style={styles.logInBtn}
            activeOpacity={0.5}
            onPress={() => this._login()}
          >
            <Text style={styles.logInText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <Text
              style={{ fontSize: 20, color: constants.styleConstants.black }}
            >
              Or
            </Text>
          </View>
          <TouchableOpacity
            style={styles.createAccountBtn}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.push("CreateAccount")}
          >
            <Text style={styles.createAccountTxt}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
  logInBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: constants.styleConstants.orange,
  },
  logInText: {
    fontSize: 20,
    color: constants.styleConstants.offWhite,
  },
  orContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  createAccountBtn: {
    width: "80%",
    // borderRadius: 25,
    // height: 50,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: constants.styleConstants.orange,
  },
  createAccountTxt: {
    fontSize: 20,
    color: constants.styleConstants.orange,
  },
});

export default LogIn;
