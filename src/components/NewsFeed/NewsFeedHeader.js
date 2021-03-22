import React from "react";
import { Header } from "react-native-elements";
import { StyleSheet } from "react-native";
import constants from "../../constants/constants";

class NewsFeedHeader extends React.Component {
  render() {
    return (
      <Header
        leftComponent={{
          text: "Home",
          style: { color: constants.styleConstants.black },
        }}
        rightComponent={{
          text: "World",
          color: constants.styleConstants.black,
        }}
        containerStyle={styles.container}
        rightContainerStyle={styles.rightContainer}
        centerContainerStyle={styles.centerContainer}
        leftContainerStyle={styles.leftContainer}
      />
    );
  }
}

export default NewsFeedHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.styleConstants.offWhite,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.styleConstants.grey,
    height: "auto",
  },
  rightContainer: {
    flex: 3,
    alignItems: "center",
    paddingRight: "25%",
  },
  centerContainer: {
    flex: 0,
    borderColor: constants.styleConstants.black,
    borderWidth: 0.5,
  },
  leftContainer: {
    flex: 3,
    alignItems: "center",
    paddingLeft: "25%",
  },
});
