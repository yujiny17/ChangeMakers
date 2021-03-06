import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import AppStatusBar from "./components/AppStatusBar";
import ToolBar from "./components/ToolBar";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppStatusBar />
        <NewsFeed />
        <View style={styles.container}>
          {/* <AppStatusBar /> */}
          <Text>Let's start coding!</Text>
        </View>
        <ToolBar />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
