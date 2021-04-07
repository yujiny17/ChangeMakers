import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import constants from "../../constants/constants";

const TopicResult = (props) => {
  const navigation = useNavigation();
  const topic = props.topic.topic;

  // pressing will lead to TopicScreen with topic (just the name) in props
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
    paddingHorizontal: 5,
  },
  topicContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  topicName: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 20,
  },
});
