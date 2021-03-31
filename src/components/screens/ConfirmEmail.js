import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import constants from "../../constants/constants";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../context/AuthContext";
import { storeToken } from "../../UserCredentials";
import errorMessage from "../ErrorMessage";

class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.route.params.username,
      password: props.route.params.password,
      confirmationCode: "",
      error: "",
    };
  }

  async _signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      console.log("Signing in user:", user);
      storeToken(user.name, user.email);
      this.context.setUserToken(user.username);
    } catch (error) {
      console.log("Error signing in", error);
      this.setState({ error: error.message });
    }
    return;
  }

  async _submit() {
    let code = this.state.confirmationCode;
    if (code == "") {
      alert("Please input confirmation code");
      return;
    }
    // regex to check if string is numbers only
    const reg = new RegExp("^[0-9]+$");
    if (!reg.test(code) || code.length != 6) {
      alert("Invalid confirmation code");
      return;
    }

    // check confirmation code, login if correct
    try {
      const confirm = await Auth.confirmSignUp(this.state.username, code);
      console.log("Confirmed user:", this.state.username);
      this._signIn(this.state.username, this.state.password);
    } catch (error) {
      console.log("Error confirming code", error);
      this.setState({ error: error.message });
      return;
    }
    return;
  }

  render() {
    let error;
    if (this.state.error != "") {
      error = errorMessage(this.state.error);
    }
    return (
      <AuthContext.Consumer>
        {() => (
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>Confirm Email</Text>
              <TextInput
                placeholder={"Confirmation Code"}
                style={styles.inputContainer}
                placeholderTextColor="#808080"
                backgroundColor={"#FBFBFB"}
                onChangeText={(input) =>
                  this.setState({ confirmationCode: input })
                }
                spellCheck={false}
                autoCapitalize={"none"}
              />
              {error}
              <TouchableOpacity
                style={styles.continueBtn}
                activeOpacity={0.5}
                onPress={() => this._submit()}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
}

ConfirmEmail.contextType = AuthContext; // to access context through this.context

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
  continueBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: constants.styleConstants.orange,
  },
  continueText: {
    fontSize: 20,
    color: constants.styleConstants.offWhite,
  },
});

export default ConfirmEmail;
