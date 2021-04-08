import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  NewsFeed,
  PostFocus,
  CreatePostForm,
  ImageBrowserScreen,
  SearchScreen,
  ProfileScreen,
  FollowSearchScreen,
  TopicScreen,
} from "./index";

import constants from "../../constants/constants";

const MainStack = createStackNavigator();

class MainApp extends React.Component {
  render() {
    const img = <Image source={require("../../../assets/close.png")} />;
    return (
      <MainStack.Navigator>
        {/* <MainStack.Screen
          name="TopicScreen"
          component={TopicScreen}
          options={{}}
          initialParams={{ topic: "dog" }}
        /> */}
        {/* <MainStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerBackTitle: " ",
          }}
          initialParams={{ user: { username: "testUser3" } }}
        /> */}

        {/* REAL SCREENS BELOW, ABOVE FOR TESTING PURPOSES */}
        <MainStack.Screen
          name="NewsFeed"
          component={NewsFeed}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: false,
            headerBackTitle: " ",
          }}
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
        <MainStack.Screen
          name="CreatePostForm"
          component={CreatePostForm}
          options={{
            headerShown: true,
            title: "Create Post",
            headerTintColor: "rgb(95, 99, 103)",
            headerTitleStyle: {
              fontSize: 18,
              color: constants.styleConstants.black,
            },
            headerBackTitle: " ",
            headerStyle: styles.headerStyle,
          }}
          initialParams={{ photos: [] }}
        />
        <MainStack.Screen
          name="ImageBrowserScreen"
          component={ImageBrowserScreen}
          options={{
            headerShown: true,
            title: "Pick Photos",
            headerBackTitle: " ",
            headerStyle: styles.headerStyle,
          }}
        />
        <MainStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerBackTitle: " ",
          }}
        />
        <MainStack.Screen
          name="FollowSearchScreen"
          component={FollowSearchScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="TopicScreen"
          component={TopicScreen}
          options={{}}
        />
      </MainStack.Navigator>
    );
  }
}

export default MainApp;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: constants.styleConstants.offWhite,
    shadowOpacity: 0,
  },
});
