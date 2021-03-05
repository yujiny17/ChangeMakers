import React from "react";
import { Header } from "react-native-elements";
import { StyleSheet } from "react-native";

function NewsFeedHeader() {
  return (
    <Header
      leftComponent={{ text: "Home", style: { color: "#323232" } }}
      rightComponent={{ text: "World", color: "#323232" }}
      containerStyle={styles.container}
      rightContainerStyle={styles.rightContainer}
      centerContainerStyle={styles.centerContainer}
      leftContainerStyle={styles.leftContainer}
    />
  );
}

export default NewsFeedHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#323232",
    paddingVertical: 15,
  },
  rightContainer: {
    flex: 3,
    alignItems: "center",
    paddingRight: "25%",
    borderLeftColor: "#323232",
    borderLeftWidth: 1,
  },
  centerContainer: {
    flex: 0,
  },
  leftContainer: {
    flex: 3,
    alignItems: "center",
    paddingLeft: "25%",
  },
});
