import React from "react";
import { Header } from "react-native-elements";
import { StyleSheet } from "react-native";

class NewsFeedHeader extends React.Component {
  render() {
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
}

export default NewsFeedHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E9E9E9",
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
