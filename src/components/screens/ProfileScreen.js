import React from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native";
import Storage from "@aws-amplify/storage";

import {
  listFollowRelationships,
  listFollowRelationshipsbyFollower,
  listPostsBySpecificOwner,
  getFollowRelationship,
} from "../../graphql/queries";
import {
  createFollowRelationship,
  updateFollowRelationship,
} from "../../graphql/mutations";

import constants from "../../constants/constants";
import UserResult from "../Search/UserResult";
import Post from "../Post/Post";
import ToolBar from "../ToolBar";
import { getToken } from "../../UserCredentials";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: null,
      currUser: null,
      followers: null,
      following: null,
      numFollowers: 0,
      numFollowing: 0,
      posts: [],
      ownProfile: false,
      followRelationship: null,
    };
  }

  async getRelationship(currUser, profileUser) {
    // try {
    //   let input = { username: currUser };
    //   console.log("about to delete currUser");
    //   let resp = await API.graphql(
    //     graphqlOperation(deleteUser, {
    //       input: input,
    //     })
    //   );
    //   console.log("resp", resp);
    //   let user = resp.data.deleteUser;
    //   console.log("response", relationship);
    //   return relationship;
    // } catch (error) {
    //   console.log("error deleting currUser", error);
    //   return null;
    // }

    // see if current user is following the profile user
    try {
      let resp = await API.graphql(
        graphqlOperation(getFollowRelationship, {
          followeeId: profileUser,
          followerId: currUser,
        })
      );
      //   console.log("resp", resp);
      let relationship = resp.data.getFollowRelationship;
      //   console.log("response", relationship);
      return relationship;
    } catch (error) {
      console.log("error fetching user posts", error);
      return null;
    }
  }

  async trulyFollowing(list) {
    let result = [];
    console.log("checking list", list);
    list.forEach((rel) => {
      console.log("checking rel", rel);
      if (rel.following) {
        result.push(rel);
      }
    });
    console.log("result is", result);
    return result;
  }

  async getFollowers(username) {
    let followersList;
    try {
      let resp = await API.graphql(
        graphqlOperation(listFollowRelationships, { followeeId: username })
      );
      //   console.log("resp", resp);
      let possFollowers = resp.data.listFollowRelationships.items;
      followersList = this.trulyFollowing(possFollowers);
      console.log(
        username,
        "is followed by",
        followersList.length,
        "followers:",
        followersList
      );
      //   this.setState({
      //     followers: followersList,
      //     numFollowers: followersList.length,
      //   });
      return followersList;
    } catch (error) {
      console.log("error fetching followers", error);
    }
    return;
  }

  async getFollowing(username) {
    let followingList;

    try {
      let resp = await API.graphql(
        graphqlOperation(listFollowRelationshipsbyFollower, {
          followerId: username,
        })
      );
      //   console.log("resp", resp);
      let possFollowing = resp.data.listFollowRelationshipsbyFollower.items;
      followingList = this.trulyFollowing(possFollowing);
      console.log(
        username,
        "is following",
        followingList.length,
        "users:",
        followingList
      );
      //   this.setState({
      //     following: followingList,
      //     numFollowing: followingList.length,
      //   });
      return followingList;
    } catch (error) {
      console.log("error fetching following", error);
    }
  }

  async getPosts(username) {
    let posts;
    try {
      let resp = await API.graphql(
        graphqlOperation(listPostsBySpecificOwner, {
          username: username,
          sortDirection: "DESC",
        })
      );
      //   console.log("resp", resp);
      posts = resp.data.listPostsBySpecificOwner.items;
      console.log(username, "has", posts.length, "posts");
      //   this.setState({ posts: posts });
      return posts;
    } catch (error) {
      console.log("error fetching user posts", error);
    }
  }

  async componentDidMount() {
    // check if this is current user's profile
    const user = this.props.route.params.user;
    const username = user.username;
    let ownProfile = false;
    let followersList = [];
    let followingList = [];
    let posts = [];
    let followRelationship = null;

    console.log("user profile for", username);

    let currUser = await getToken();
    if (currUser.username == username) {
      ownProfile = true;
    }

    let relationship = await this.getRelationship(currUser.username, username);

    if (relationship != null) {
      followRelationship = relationship;
    }
    console.log("curr relationship", relationship);
    // followersList = await this.getFollowers(username);
    // followingList = await this.getFollowing(username);
    // posts = await this.getPosts(username);

    this.setState({
      currUser: currUser.username,
      profileUser: username,
      ownProfile: ownProfile,
      followersList: followersList,
      followingList: followingList,
      numFollowers: followersList.length,
      numFollowing: followingList.length,
      posts: posts,
      followRelationship: followRelationship,
    });
  }

  async follow(toggleFollow) {
    let relationship;
    let currUser = this.state.currUser;
    let profileUser = this.state.profileUser;

    if (toggleFollow) {
      try {
        let input = {
          followeeId: profileUser,
          followerId: currUser,
          following: true,
        };
        let resp;
        if (this.state.followRelationship == null) {
          resp = await API.graphql(
            graphqlOperation(createFollowRelationship, { input: input })
          );
          relationship = resp.data.createFollowRelationship;
        } else {
          resp = await API.graphql(
            graphqlOperation(updateFollowRelationship, { input: input })
          );
          relationship = resp.data.updateFollowRelationship;
        }
        // console.log("response", relationship);
        this.setState({ followRelationship: relationship });
        return relationship;
      } catch (error) {
        console.log("error creating follow relationship", error);
        return null;
      }
    } else {
      try {
        let input = {
          followeeId: profileUser,
          followerId: currUser,
          following: false,
        };
        let resp = await API.graphql(
          //   graphqlOperation(deleteFollowRelationship, { input: input })
          graphqlOperation(updateFollowRelationship, { input: input })
        );
        // relationship = resp.data.deleteFollowRelationship;
        relationship = resp.data.updateFollowRelationship;
        console.log("response", relationship);
        this.setState({ followRelationship: relationship });
        return relationship;
      } catch (error) {
        // console.log("error deleting follow relationship", error);
        console.log("error updating follow relationship", error);
        return null;
      }
    }
  }

  // only being called if current profile is not the user's
  _followButton() {
    if (
      this.state.followRelationship != null &&
      this.state.followRelationship?.following
    ) {
      return (
        <TouchableOpacity
          style={styles.followingButtonContainer}
          onPress={() => this.follow(false)}
        >
          <Text style={styles.followingText}>Following</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.followButtonContainer}
          onPress={() => this.follow(true)}
        >
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const user = this.props.route.params.user;
    let userPhotoExists = false;
    if (user.photo != null) {
      userPhotoExists = true;
    }

    let followButton;
    if (!this.state.ownProfile) {
      followButton = this._followButton();
    }

    return (
      <View style={styles.container}>
        <View style={styles.belowAppStatusContainer}>
          <ScrollView contentContainerStyle={styles.profileContainer}>
            <View style={styles.userPhotoName}>
              <View style={styles.userPhotoName2}>
                <View style={styles.userPhotoContainer}>
                  {userPhotoExists ? (
                    <S3Image imgKey={user.photo} style={styles.userPhoto} />
                  ) : (
                    <Icon
                      name="account-circle"
                      type="material-community"
                      color="black"
                      size={100}
                    />
                  )}
                </View>
                <View style={styles.userNameContainer}>
                  <Text style={styles.userName}>{user.username}</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <TouchableOpacity
                style={styles.followContainer}
                onPress={() =>
                  this.props.navigation.navigate("FollowSearchScreen", {
                    followers: this.state.followers,
                    following: this.state.following,
                    focus: "followers",
                  })
                }
              >
                <View style={styles.followContainer2}>
                  <Text style={styles.numText}>{this.state.numFollowers}</Text>
                </View>

                <Text style={styles.followerText}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.followContainer}
                onPress={() =>
                  this.props.navigation.navigate("FollowSearchScreen", {
                    followers: this.state.followers,
                    following: this.state.following,
                    focus: "following",
                  })
                }
              >
                <TouchableOpacity style={styles.followContainer2}>
                  <Text style={styles.numText}>{this.state.numFollowing}</Text>
                </TouchableOpacity>
                <Text style={styles.followerText}>Following</Text>
              </TouchableOpacity>
            </View>
            {followButton}
            <View style={styles.postsContainer}>
              {this.state.posts.map((post) => (
                <Post post={post} key={post.id} focusPost={false}></Post>
              ))}
            </View>
          </ScrollView>
          <ToolBar />
        </View>
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <ProfileScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  belowAppStatusContainer: {
    // flex: 1,
    height: Dimensions.get("window").height * 0.95,
    width: Dimensions.get("window").width,
    backgroundColor: constants.styleConstants.white,
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  profileContainer: {
    // flex: 1,
    width: 100 + "%",
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignContent: "center",
    alignItems: "center",
  },
  userPhotoName: {
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 20,
    // paddingHorizontal: 35,
  },
  userPhotoName2: {
    flexDirection: "row",
    justifyContent: "center",
  },
  userPhotoContainer: {
    height: 100,
    width: 100,
  },
  userPhoto: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userNameContainer: {
    height: 100 + "%",
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    marginLeft: 15,
    fontSize: 35,
  },
  infoContainer: {
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width * 0.7,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: "yellow",
  },
  followContainer: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  followContainer2: {
    height: 22,
    flexDirection: "row",
    justifyContent: "center",
  },
  numText: {
    fontSize: 20,
  },
  followingButtonContainer: {
    height: 50,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: constants.styleConstants.orange,
  },
  followButtonContainer: {
    height: 50,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: constants.styleConstants.white,
    borderColor: constants.styleConstants.orange,
    borderWidth: 3,
  },
  followText: {
    fontSize: 20,
    color: constants.styleConstants.orange,
  },
  followingText: {
    fontSize: 20,
    color: constants.styleConstants.offWhite,
  },

  postsContainer: {
    width: Dimensions.get("window").width,
  },
});
