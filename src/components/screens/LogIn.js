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
import { storeToken, getToken } from "../../UserCredentials";
import errorMessage from "../ErrorMessage";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
    };
  }

  async _signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      console.log("Signing in user:", user.username);

      storeToken(username, password);
      this.context.setUserToken(username);
    } catch (error) {
      console.log("Error signing in", error);
      this.setState({ error: error.message });
    }
    return;
  }

  _validate_fields(username, password) {
    if (username == "") {
      alert("Please input username");
      return false;
    } else if (password == "") {
      alert("Please input password");
      return false;
    }
    return true;
  }

  _submit() {
    let username = this.state.username;
    let password = this.state.password;
    if (this._validate_fields(username, password) == false) return;
    this._signIn(username, password);
    return;
  }

  async _checkUser() {
    let user;
    try {
      user = await getToken();
    } catch (error) {
      console.log("error retrieving user token");
      return;
    }
    if (user != null) {
      try {
        const authUser = await Auth.signIn(user.username, user.password);
        this.context.setUserToken(authUser.username);
        console.log(user.username, "is logged in");
      } catch (error) {
        console.log(
          "User token exists but could not authenticate with Cognito",
          error
        );
        return;
      }
    }
  }

  componentDidMount() {
    // check if already signed in
    this._checkUser();
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
              {error}
              <TouchableOpacity
                style={styles.logInBtn}
                activeOpacity={0.5}
                onPress={() => this._submit()}
              >
                <Text style={styles.logInText}>Log In</Text>
              </TouchableOpacity>
              <View style={styles.orContainer}>
                <Text
                  style={{
                    fontSize: 20,
                    color: constants.styleConstants.black,
                  }}
                >
                  Or
                </Text>
              </View>
              <TouchableOpacity
                style={styles.createAccountBtn}
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate("CreateAccount")}
              >
                <Text style={styles.createAccountTxt}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
}

LogIn.contextType = AuthContext; // to access context through this.context

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
