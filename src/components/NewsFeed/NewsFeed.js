import React from "react";

// import { StatusBar, StyleSheet, Text, View } from "react-native";
import { View } from "react-native";

import NewsFeedHeader from "./NewsFeedHeader";
import NewsFeedBody from "./NewsFeedBody";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/NewsFeed";

class NewsFeed extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NewsFeedHeader />
        <NewsFeedBody />
      </View>
    );
  }
}

export default NewsFeed;
