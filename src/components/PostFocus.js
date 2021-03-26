import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import AppStatusBar from "./AppStatusBar";
import ToolBar from "./ToolBar";
import Post from "./Post/Post";
import constants from "../constants/constants.js";

class PostFocus extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {};
    }
  }

  componentDidMount() {}

  render() {
    const post = this.props.route.params.post;
    return (
      <View style={styles.container}>
        <AppStatusBar />
        <View style={styles.postFocusContainer}>
          <Post post={post} id={post.id} focusPost={true} />
        </View>
        <ToolBar />
      </View>
    );
  }
}
export default function (props) {
  //   console.log("props are", { ...props });
  const navigation = useNavigation();
  return <PostFocus {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    justifyContent: "center",
  },
  postFocusContainer: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    // paddingTop: 10,
  },
});
