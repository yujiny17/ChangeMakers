import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NewsFeed from "../NewsFeed/NewsFeed";
import AppStatusBar from "../AppStatusBar";
import ToolBar from "../ToolBar";
import constants from "../../constants/constants.js";

const MainApp = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppStatusBar />
        <NewsFeed />
        <ToolBar />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainApp;
