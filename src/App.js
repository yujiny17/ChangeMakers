import React from "react";
import { MainApp, LogIn, CreateAccount } from "./components/screens/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "./components/screens/Loading";

import { AuthContext } from "./context/AuthContext";

import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

const AuthStack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userToken: null,
      setUserToken: this.setUserToken,
    };
  }

  setUserToken = (userToken) => {
    this.setState({ userToken: userToken });
  };

  render() {
    const AuthStackScreen = () => (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ title: "" }}
        />
      </AuthStack.Navigator>
    );
    return (
      <AuthContext.Provider value={this.state}>
        <NavigationContainer>
          {this.state.userToken ? <MainApp /> : <AuthStackScreen />}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}

export default App;

/* <NavigationContainer>
      {this.state.isLoading ? <Loading /> : this.state.userToken
       ? <MainApp /> : <AuthStackScreen />}
    </NavigationContainer> */
