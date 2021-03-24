import React from "react";
import { StyleSheet, Text, View } from "react-native";

const errorMessage = (text) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    width: "80%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default errorMessage;
