import React from "react";
import { MainApp, LogIn, CreateAccount } from "./components/screens/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "./components/screens/Loading";
const AuthStack = createStackNavigator();

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

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      // setUser({});
    }, 500);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? <Loading /> : userToken ? <MainApp /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};
