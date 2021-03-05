import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import AppStatusBar from "./components/AppStatusBar";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <NewsFeed />
        <View style={styles.container}>
          <AppStatusBar />
          <Text>Let's start coding!</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
