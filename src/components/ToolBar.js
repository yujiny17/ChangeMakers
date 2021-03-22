import React from "react";
import { Button, Icon } from "react-native-elements";
import { View, StyleSheet, Dimensions } from "react-native";
import constants from "../constants/constants";

class ToolBar extends React.Component {
  render() {
    return (
      <View style={styles.ToolBarContainer}>
        <Button
          nativeID="leftButton"
          style={styles.HomeButton}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          icon={
            <Icon
              name="home"
              type="material-community"
              color="black"
              style={styles.HomeIcon}
              containerStyle={styles.HomeIconContainer}
            />
          }
        />
        <Button
          nativeID="homeButton"
          style={styles.HomeButton}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          icon={
            <Icon
              name="account"
              type="material-community"
              color="black"
              style={styles.HomeIcon}
              containerStyle={styles.HomeIconContainer}
            />
          }
        />
      </View>
    );
  }
}

export default ToolBar;

const SCREEN_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  ToolBarContainer: {
    // height: constants.styleConstants.rowHeight,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    justifyContent: "center",
  },
  HomeButton: {
    width: SCREEN_WIDTH * 0.5,
  },
  HomeIconContainer: {},
  HomeIcon: {
    padding: 0,
    flexDirection: "column",
    justifyContent: "center",
  },
});

// Minor bug: Button creates a View inside the Button that has padding
//     which leads to rounded corners. Possible fix is to pass in a view
//     with no padding to the ViewComponent prop
