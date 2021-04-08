import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { S3Image } from "aws-amplify-react-native";
import { useNavigation } from "@react-navigation/native";
import { getToken, getProfilePicture } from "../../UserCredentials";

import constants from "../../constants/constants";

class UserBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: null,
        photo: null,
      },
    };
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
    let userPhotoExists = false;
    if (this.state.user?.photo != null) {
      userPhotoExists = true;
    }

    return (
      <TouchableOpacity
        style={styles.userBar}
        onPress={() => this.props.onPress()}
        activeOpacity={1.0}
      >
        <View style={styles.userPhotoName}>
          {/* {userPhotoExists ? (
            <S3Image imgKey={this.state.user.photo} style={styles.userPhoto} />
          ) : (
            <Icon
              name="account-circle"
              type="material-community"
              color="black"
              size={40}
            />
          )} */}
          <Icon
            name="account-circle"
            type="material-community"
            color="black"
            size={40}
          />
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>Yujin</Text>
            {/* <Text style={styles.userName}>{user.username}</Text> */}
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 30,
              textAlignVertical: "top",
            }}
          >
            ...
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default UserBar;

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    backgroundColor: constants.styleConstants.postBackgroundColor,
    borderBottomWidth: constants.styleConstants.betweenPostsWidth,
    borderBottomColor: constants.styleConstants.grey,
    paddingTop: 5,
  },
  userBar: {
    height: constants.styleConstants.rowHeight,
    width: 100 + "%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  userPhotoName: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  userPhoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  userNameContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    marginLeft: 10,
    fontWeight: "500",
  },
});
