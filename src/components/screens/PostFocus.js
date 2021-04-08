import React from "react";
import {
  View,
  Keyboard,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import AppStatusBar from "../AppStatusBar";
import ToolBar from "../ToolBar";
import Post from "../Post/Post";
import constants from "../../constants/constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useGestureHandlerRef, useHeaderHeight } from "@react-navigation/stack";

const statusBarHeight = StatusBar.currentHeight;

class PostFocus extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {};
    }
  }

  render() {
    const post = this.props.route.params.post;

    return (
      <KeyboardAwareScrollView
        // extraScrollHeight={500}
        style={
          (styles.keyboardContainer,
          {
            height: Dimensions.get("window").height - this.props.headerHeight,
          })
        }
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        enableAutomaticScroll={true}
        // ref={this.scrollRef}
        // innerRef={(ref) => {
        //   this.scroll = ref;
        //   // this.scroll = ref.getScrollResponder();
        // }}
      >
        <AppStatusBar />
        <View style={styles.postFocusContainer}>
          <Post post={post} id={post.id} focusPost={true} />
        </View>
      </KeyboardAwareScrollView>
    );
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => Keyboard.dismiss()}
        style={styles.container}
      >
        <AppStatusBar />
        <View style={styles.postFocusContainer}>
          <Post post={post} id={post.id} focusPost={true} />
        </View>
      </TouchableOpacity>
    );
  }
}
export default function (props) {
  //   console.log("props are", { ...props });
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  return (
    <PostFocus {...props} navigation={navigation} headerHeight={headerHeight} />
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    // height: 100 + "%",
    // height: Dimensions.get("window").height - headerHeight - statusBarHeight,
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    backgroundColor: "red",
  },
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
