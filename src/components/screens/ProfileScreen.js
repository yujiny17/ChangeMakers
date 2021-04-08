import React from "react";
import {
  Image,
  PixelRatio,
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
  listTopicFollowRelationships,
} from "../../graphql/queries";
import {
  createFollowRelationship,
  updateFollowRelationship,
  createPersonalTimeline,
} from "../../graphql/mutations";

import constants from "../../constants/constants";
import UserResult from "../Search/UserResult";
import Post from "../Post/Post";
import ToolBar from "../ToolBar";
import TopicResult from "../Search/TopicResult";
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
      focus: "posts",
      topics: [],
    };
  }

  async getRelationship(currUser, profileUser) {
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
      console.log("error fetching relationship", error);
      return null;
    }
  }

  trulyFollowing(list) {
    let result = [];
    // console.log("checking list", list);
    list.forEach((rel) => {
      // console.log("checking rel", rel);
      if (rel.following) {
        result.push(rel);
      }
    });
    // console.log("result is", result);
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
      return posts;
    } catch (error) {
      console.log("error fetching user posts", error);
    }
  }

  async getTopics(username) {
    let list;
    try {
      let resp = await API.graphql(
        graphqlOperation(listTopicFollowRelationships, { followerId: username })
      );
      console.log("resp", resp);
      let possList = resp.data.listTopicFollowRelationships.items;
      list = this.trulyFollowing(possList);
      console.log(username, "follows", list);
      return list;
    } catch (error) {
      console.log("error fetching topics", error);
    }
    return;
  }

  async componentDidMount() {
    // check if this is current user's profile
    const user = this.props.route.params.user;
    const username = user.username;
    let ownProfile = false;
    let followersList = [];
    let followingList = [];
    let posts = [];
    let topics = [];
    let followRelationship = null;

    this.props.navigation.setOptions({
      headerTitle: username,
    });

    let currUser = await getToken();
    if (currUser.username == username) {
      ownProfile = true;
    }

    // for testing purposes
    // followersList = [
    //   {
    //     createdAt: "2021-04-07T00:46:50.160Z",
    //     followeeId: "testUser3",
    //     followerId: "testUser2",
    //     following: true,
    //     updatedAt: "2021-04-07T00:49:45.398Z",
    //   },
    // ];
    // followingList = [
    //   {
    //     createdAt: "2021-04-06T12:56:42.723Z",
    //     followeeId: "testUser",
    //     followerId: "testUser3",
    //     following: true,
    //     updatedAt: "2021-04-06T13:04:00.889Z",
    //   },
    // ];
    // this.setState({
    //   followers: followersList,
    //   following: followingList,
    //   numFollowers: followersList.length,
    //   numFollowing: followingList.length,
    // });
    // return;

    let relationship = await this.getRelationship(currUser.username, username);

    if (relationship != null) {
      followRelationship = relationship;
    }
    // console.log("curr relationship", relationship);

    followersList = await this.getFollowers(username);
    followingList = await this.getFollowing(username);
    posts = await this.getPosts(username);
    topics = await this.getTopics(username);

    this.setState({
      currUser: currUser.username,
      profileUser: username,
      ownProfile: ownProfile,
      followersList: followersList,
      followingList: followingList,
      numFollowers: followersList.length,
      numFollowing: followingList.length,
      posts: posts,
      topics: topics,
      followRelationship: followRelationship,
    });

    console.log(this.state);
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
        // add followee's posts onto follower's timeline
        let followeePosts;
        resp = await API.graphql(
          graphqlOperation(listPostsBySpecificOwner, { username: profileUser })
        );
        //   console.log("resp", resp);
        followeePosts = resp.data.listPostsBySpecificOwner.items;
        // add all the followee's posts to user timeline
        resp = await Promise.all(
          followeePosts.map(async (post) => {
            console.log("adding post", post, "to user", currUser);
            const timelineAddition = { username: currUser, postId: post.id };
            await API.graphql(
              graphqlOperation(createPersonalTimeline, {
                input: timelineAddition,
              })
            );
          })
        );
        console.log("resp for adding all followee's posts", resp);

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
          graphqlOperation(updateFollowRelationship, { input: input })
        );
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

  _focus(option) {
    if (option != this.state.focus) {
      this.setState({ focus: option, results: null });
    }
  }
  _optionBar() {
    if (this.state.focus == "topics") {
      return (
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => this._focus("posts")}
          >
            <Text style={styles.postsText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.focusedOptionContainer}
            onPress={() => this._focus("topics")}
          >
            <Text style={styles.topicsText}>Topics</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={styles.focusedOptionContainer}
            onPress={() => this._focus("posts")}
          >
            <Text style={styles.postsText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => this._focus("topics")}
          >
            <Text style={styles.topicsText}>Topics</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _body() {
    if (this.state.focus == "posts") {
      return (
        <View style={styles.postsContainer}>
          {this.state.posts.map((post) => (
            <Post post={post} key={post.id} focusPost={false}></Post>
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.postsContainer}>
          {this.state.topics.map((topic, i) => (
            <TopicResult topic={topic} key={i} />
          ))}
        </View>
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

    let optionBar = this._optionBar();
    let body = this._body();

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
                  {/* <Icon
                    name="account-circle"
                    type="material-community"
                    color="black"
                    size={100}
                  /> */}
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
                <View style={styles.followContainer2}>
                  <Text style={styles.numText}>{this.state.numFollowing}</Text>
                </View>
                <Text style={styles.followerText}>Following</Text>
              </TouchableOpacity>
            </View>
            {followButton}
            {optionBar}
            {body}
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
    height: Dimensions.get("window").height * 0.9,
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
    height: Dimensions.get("window").height * 0.18,
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
    // height: 100,
    // width: 100,
  },
  userPhoto: {
    // height: 100,
    // width: 100,
    height: 320 / PixelRatio.get(),
    width: 320 / PixelRatio.get(),
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
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.7,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
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
    margin: 10,
    backgroundColor: constants.styleConstants.orange,
  },
  followButtonContainer: {
    height: 50,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,

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

  optionBar: {
    height: 40,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
  },
  optionContainer: {
    width: Dimensions.get("window").width / 2,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: constants.styleConstants.grey,
    backgroundColor: constants.styleConstants.white,
    borderWidth: 3,
  },
  focusedOptionContainer: {
    width: Dimensions.get("window").width / 2,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: constants.styleConstants.orange,
    backgroundColor: constants.styleConstants.white,
    borderWidth: 3,
  },

  topicsText: {
    padding: 4,
    fontSize: 15,
  },
  postsText: {
    padding: 4,
    fontSize: 15,
  },

  postsContainer: {
    width: Dimensions.get("window").width,
  },
});
