import React from "react";

// import { StatusBar, StyleSheet, Text, View } from "react-native";
import { StyleSheet, View } from "react-native";

import AppStatusBar from "../AppStatusBar";
import ToolBar from "../ToolBar";
import NewsFeedHeader from "./NewsFeedHeader";
import NewsFeedBody from "./NewsFeedBody";
import constants from "../../constants/constants.js";

import { connect } from "react-redux";
import { fetchPosts } from "../../actions/NewsFeed";

class NewsFeed extends React.Component {
  // componentDidMount() {
  // this.props.navigation.navigate("SearchScreen");
  // }
  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar />
        <NewsFeedHeader />
        <NewsFeedBody />
        <ToolBar />
      </View>
    );
  }
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
});

export default NewsFeed;
