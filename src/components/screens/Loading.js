import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import constants from "../../constants/constants";

const Loading = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text> Loading </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loading;
