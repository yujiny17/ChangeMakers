import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { AuthContext } from "../../context/AuthContext";

import constants from "../../constants/constants";
import errorMessage from "../ErrorMessage";

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      userNameError: "",
      validEmail: true,
      validPassword: true,
      error: "",
    };
  }

  _validate_fields(username, email, password) {
    // cheeck for empty fields
    if (username == "") {
      alert("Please input username");
      return false;
    } else if (email == "") {
      alert("Please input email");
      return false;
    } else if (password == "") {
      alert("Please input password");
      return false;
    }
    // check valid password and email
    let allValid = true;
    if (password.length < 6) {
      this.setState({ validPassword: false });
      allValid = false;
    } else {
      this.setState({ validPassword: true });
    }

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      this.setState({ validEmail: false });
      allValid = false;
    } else {
      this.setState({ validEmail: true });
    }
    return allValid;
  }

  async _signUp(username, password, email) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log("Signed up in Cognito for user:", user.username);

      this.props.navigation.push("ConfirmEmail", {
        username: username,
        password: password,
        email: email,
      });
    } catch (error) {
      console.log("ERROR: sign up", error);
      if (error.code == "UsernameExistsException") {
        this.setState({ userNameError: "Username is taken" });
      } else {
        this.setState({ error: error.message });
      }
    }
  }

  _submit() {
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    if (this._validate_fields(username, email, password) == false) return;
    this._signUp(username, password, email);
  }

  _changeUsername(input) {
    this.setState({ username: input });
    this.setState({ userNameError: "" });
    return;
  }

  render() {
    let usernameErrorMessage;
    let emailErrorMessage;
    let passwordErrorMessage;
    let otherErrorMessage;
    if (this.state.userNameError != "") {
      usernameErrorMessage = errorMessage(this.state.userNameError);
    }
    if (!this.state.validEmail) {
      emailErrorMessage = errorMessage("Please enter a valid email");
    }
    if (!this.state.validPassword) {
      otherErrorMessage = errorMessage(
        "Password must be greater than six characters"
      );
    }
    if (this.state.error != "") {
      otherErrorMessage = errorMessage(this.state.error);
    }
    return (
      <AuthContext.Consumer>
        {() => (
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>Join Voices</Text>
              <TextInput
                placeholder={"Username"}
                style={styles.inputContainer}
                placeholderTextColor="#808080"
                backgroundColor={"#FBFBFB"}
                onChangeText={(input) => this._changeUsername(input)}
                spellCheck={false}
                autoCapitalize={"none"}
                autoCompleteType={"off"}
              />
              {usernameErrorMessage}
              <TextInput
                placeholder={"Email"}
                style={styles.inputContainer}
                placeholderTextColor="#808080"
                backgroundColor={"#FBFBFB"}
                onChangeText={(input) => this.setState({ email: input })}
                spellCheck={false}
                autoCapitalize={"none"}
                autoCompleteType={"off"}
              />
              {emailErrorMessage}
              <TextInput
                placeholder={"Password"}
                style={styles.inputContainer}
                placeholderTextColor="#808080"
                backgroundColor={"#FBFBFB"}
                onChangeText={(input) => this.setState({ password: input })}
                secureTextEntry={true}
                spellCheck={false}
                autoCapitalize={"none"}
                autoCompleteType={"off"}
              />
              {passwordErrorMessage}
              {otherErrorMessage}
              <TouchableOpacity
                style={styles.createAccountBtn}
                activeOpacity={0.5}
                onPress={() => this._submit()}
              >
                <Text style={styles.createAccountText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
}

CreateAccount.contextType = AuthContext; // to access context through this.context

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
