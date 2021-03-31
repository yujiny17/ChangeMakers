import React from "react";
import { Button, Icon } from "react-native-elements";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import constants from "../constants/constants";

class ToolBar extends React.Component {
  createPost() {
    const { navigation } = this.props;
    navigation.navigate("CreatePostForm");
  }
  render() {
    return (
      <View style={styles.ToolBarContainer}>
        <Button
          nativeID="leftButton"
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          icon={
            <Icon
              name="home"
              type="material-community"
              color="black"
              style={styles.icon}
              containerStyle={styles.iconContainer}
              size={30}
            />
          }
        />
        <Button
          nativeID="plus"
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          icon={
            <Icon
              name="plus"
              type="material-community"
              color="black"
              style={styles.icon}
              containerStyle={styles.iconContainer}
              size={30}
            />
          }
          onPress={() => this.createPost()}
        />
        <Button
          nativeID="homeButton"
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          icon={
            <Icon
              name="account"
              type="material-community"
              color="black"
              style={styles.icon}
              containerStyle={styles.iconContainer}
              size={30}
            />
          }
        />
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <ToolBar {...props} navigation={navigation} />;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  ToolBarContainer: {
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: SCREEN_WIDTH / 3,
  },
  iconContainer: {},
  icon: {
    padding: 0,
    flexDirection: "column",
    justifyContent: "center",
  },
});
