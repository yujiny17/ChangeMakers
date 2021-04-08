import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import constants from "../../constants/constants";

const TopicResult = (props) => {
  const navigation = useNavigation();
  const topic = props.topic.topic;

  // pressing will lead to TopicScreen with topic (just the name) in r
  return (
    <TouchableOpacity
      style={styles.topicBar}
      onPress={() => navigation.push("TopicScreen", { topic: topic })}
      activeOpacity={0.8}
    >
      <View style={styles.topicContainer}>
        <Text style={styles.topicName}>{topic}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopicResult;

const styles = StyleSheet.create({
  topicBar: {
    height: constants.styleConstants.rowHeight * 1.1,
    width: 100 + "%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  topicContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: constants.styleConstants.orange,
    borderColor: constants.styleConstants.orange,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topicName: {
    fontWeight: "500",
    fontSize: 20,
    color: constants.styleConstants.white,
  },
});
