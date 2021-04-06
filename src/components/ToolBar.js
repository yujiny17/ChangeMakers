import React from "react";
import { Button, Icon } from "react-native-elements";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getToken, getProfilePicture } from "../UserCredentials";
import constants from "../constants/constants";

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  async componentDidMount() {
    const userToken = await getToken();
    const photo = await getProfilePicture();
    let user = {
      username: userToken.username,
      photo: photo.profilePicture,
    };
    this.setState({ user: user });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.ToolBarContainer}>
        <Button
          nativeID="homeButton"
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          onPress={() => this.props.navigation.navigate("NewsFeed")}
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
          nativeID="searchButton"
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          onPress={() => this.props.navigation.navigate("SearchScreen")}
          icon={
            <Icon
              name="search-outline"
              type="ionicon"
              color="black"
              style={styles.icon}
              containerStyle={styles.iconContainer}
              size={27}
            />
          }
        />
        <Button
          nativeID="plusButton"
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          onPress={() => navigation.navigate("CreatePostForm")}
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
        />
        <Button
          nativeID="accountButton"
          style={styles.button}
          buttonStyle={{
            backgroundColor: "#F8F8F8",
          }}
          onPress={() =>
            navigation.navigate("ProfileScreen", {
              user: this.state.user,
            })
          }
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
    alignContent: "center",
  },
  button: {
    width: SCREEN_WIDTH / 4,
  },
  iconContainer: {},
  icon: {
    padding: 0,
    flexDirection: "column",
    justifyContent: "center",
  },
});
