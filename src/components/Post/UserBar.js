import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { S3Image } from "aws-amplify-react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";

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
      photo: "",
    };
  }

  async _getPostUser(username) {
    let users = [];
    try {
      let resp = await API.graphql(
        graphqlOperation(getUser, { username: username })
      );
      let user = resp.data.getUser;
      // console.log("post user is", user);
      return user;
    } catch (error) {
      console.log("error get post user", error);
    }
    return users;
  }

  async componentDidMount() {
    let loadPostUser = this.props.loadPostUser;
    // if !loadPostUser, then it's a CreatePostForm so just get
    // current user
    if (!loadPostUser) {
      const userToken = await getToken();
      const photoToken = await getProfilePicture();
      let photo;
      if (photoToken != null) photo = photoToken.profilePicture;
      let user = {
        username: userToken.username,
        photo: photo,
      };
      this.setState({ user: user, photo: user.photo });
      return;
    }
    // otherwise, load post user
    else {
      const username = this.props.username;
      let user = await this._getPostUser(username);
      this.setState({ user: user, photo: user.photo });
    }
  }

  render() {
    let userPhotoExists = false;
    if (this.state.photo != null) {
      userPhotoExists = true;
    }
    return (
      <TouchableOpacity
        style={styles.userBar}
        onPress={() =>
          this.props.navigation.navigate("ProfileScreen", {
            user: this.state.user,
          })
        }
        activeOpacity={1.0}
      >
        <View style={styles.userPhotoName}>
          {userPhotoExists ? (
            <S3Image imgKey={this.state.photo} style={styles.userPhoto} />
          ) : (
            <Icon
              name="account-circle"
              type="material-community"
              color="black"
              size={40}
            />
          )}
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{this.state.user.username}</Text>
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
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
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
