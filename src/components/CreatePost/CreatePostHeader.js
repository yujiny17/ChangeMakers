import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

import constants from "../../constants/constants";

const PostButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      title="Post"
      color={constants.styleConstants.black}
      style={styles.postButtonContainer}
    >
      <Text style={styles.postButtonText}>Post</Text>
    </TouchableOpacity>
  );
};

const CloseButton = () => {
  return (
    <Icon
      name="close"
      type="material-community"
      color="black"
      containerStyle={styles.closeButtonContainer}
      size={30}
    />
  );
};
export { PostButton, CloseButton };

const styles = StyleSheet.create({
  postButtonContainer: {
    color: constants.styleConstants.offWhite,
    paddingHorizontal: 20,
  },
  postButtonText: {
    fontSize: 15,
  },
  closeButtonContainer: {
    paddingHorizontal: 10,
  },
});
