import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NewsFeed, PostFocus } from "./index";
// import AppStatusBar from "../AppStatusBar";
// import ToolBar from "../ToolBar";

import { createStackNavigator } from "@react-navigation/stack";
import constants from "../../constants/constants";

const MainStack = createStackNavigator();

class MainApp extends React.Component {
  render() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="NewsFeed"
          component={NewsFeed}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="PostFocus"
          component={PostFocus}
          options={{
            headerShown: true,
            title: "",
            headerTintColor: "rgb(95, 99, 103)",
            headerTitleStyle: {},
            headerBackTitle: " ",
            headerStyle: styles.headerStyle,
          }}
        />
      </MainStack.Navigator>
    );
  }
}

export default MainApp;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: constants.styleConstants.postBackgroundColor,
    shadowOpacity: 0,
  },
});
