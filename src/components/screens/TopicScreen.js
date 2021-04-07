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
  //   listTopicFollowRelationshipsbyFollower,
  listPostsBySpecificOwner,
  listTopicTimelinesByTopic,
  getTopicFollowRelationship,
} from "../../graphql/queries";
import {
  createTopicFollowRelationship,
  updateTopicFollowRelationship,
} from "../../graphql/mutations";

import constants from "../../constants/constants";
import Post from "../Post/Post";
import ToolBar from "../ToolBar";
import { getToken } from "../../UserCredentials";

class TopicScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
      user: null,
      posts: [],
      followRelationship: null,
    };
  }

  async getRelationship(user, topic) {
    // see if current user is following the profile user
    try {
      let resp = await API.graphql(
        graphqlOperation(getTopicFollowRelationship, {
          followerId: user,
          topic: topic,
        })
      );
      //   console.log("resp", resp);
      let relationship = resp.data.getTopicFollowRelationship;
      //   console.log("response", relationship);
      return relationship;
    } catch (error) {
      console.log("error fetching user topic relationship", error);
      return null;
    }
  }

  async getPosts(topic) {
    let posts = [];
    try {
      let resp = await API.graphql(
        graphqlOperation(listTopicTimelinesByTopic, {
          topic: topic,
          sortDirection: "DESC",
        })
      );
      //   console.log("resp", resp);
      let timelines = resp.data.listTopicTimelinesByTopic.items;
      timelines.forEach((obj) => {
        posts.push(obj.post);
      });
      console.log(topic, "has", posts.length, "posts");
      return posts;
    } catch (error) {
      console.log("error fetching topic timeline", error);
    }
  }

  async componentDidMount() {
    const topic = this.props.route.params.topic;
    let userToken = await getToken();
    let user = userToken.username;
    let posts = [];
    let followRelationship = null;

    console.log("topic user", topic, user);

    this.props.navigation.setOptions({
      headerTitle: topic,
    });

    // determine whether user is following topic
    let relationship = await this.getRelationship(user, topic);

    if (relationship != null) {
      followRelationship = relationship;
    }
    posts = await this.getPosts(topic);

    this.setState({
      topic: topic,
      user: user,
      posts: posts,
      followRelationship: followRelationship,
    });
    console.log("state is now", this.state);
  }

  async follow(toggleFollow) {
    let relationship;
    let user = this.state.user;
    let topic = this.state.topic;

    if (toggleFollow) {
      try {
        let input;
        let resp;
        if (this.state.followRelationship == null) {
          input = {
            topic: topic,
            followerId: user,
            following: true,
          };
          resp = await API.graphql(
            graphqlOperation(createTopicFollowRelationship, { input: input })
          );
          relationship = resp.data.createTopicFollowRelationship;
        } else {
          input = {
            topic: topic,
            followerId: user,
            following: true,
          };
          resp = await API.graphql(
            graphqlOperation(updateTopicFollowRelationship, { input: input })
          );
          relationship = resp.data.updateTopicFollowRelationship;
        }
        console.log("follow topic", relationship);

        //       ADD TOPIC POSTS ONTO USER's TOPIC TIMELINE (not created yet)
        //         let followeePosts;
        //         resp = await API.graphql(
        //           graphqlOperation(listPostsBySpecificOwner, { username: profileUser })
        //         );
        //         //   console.log("resp", resp);
        //         followeePosts = resp.data.listPostsBySpecificOwner.items;
        //         // add all the followee's posts to user timeline
        //         resp = await Promise.all(
        //           followeePosts.map(async (post) => {
        //             console.log("adding post", post, "to user", currUser);
        //             const timelineAddition = { username: currUser, postId: post.id };
        //             await API.graphql(
        //               graphqlOperation(createPersonalTimeline, {
        //                 input: timelineAddition,
        //               })
        //             );
        //           })
        //         );
        //         console.log("resp for adding all followee's posts", resp);

        this.setState({ followRelationship: relationship });
        return relationship;
      } catch (error) {
        console.log("error following topic", error);
        return null;
      }
    } else {
      try {
        let input = {
          followerId: user,
          topic: topic,
          following: false,
        };
        console.log("trying with input", input);
        let resp = await API.graphql(
          graphqlOperation(updateTopicFollowRelationship, { input: input })
        );
        relationship = resp.data.updateTopicFollowRelationship;
        console.log("unfollow topic response", relationship);
        this.setState({ followRelationship: relationship });
        return relationship;
      } catch (error) {
        console.log("error unfollowing topic", error);
        return null;
      }
    }
  }

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
    let followButton = this._followButton();
    let topic = this.props.route.params.topic;
    // console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.belowAppStatusContainer}>
          <ScrollView contentContainerStyle={styles.profileContainer}>
            <View style={styles.topicNameContainer}>
              <Text style={styles.topicName}>{topic}</Text>
              {followButton}
            </View>
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
  return <TopicScreen {...props} navigation={navigation} />;
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
    alignItems: "flex-start",
  },

  profileContainer: {
    // flex: 1,
    width: 100 + "%",
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignContent: "center",
    alignItems: "center",
  },
  topicNameContainer: {
    // height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: constants.styleConstants.betweenPostsWidth,
    borderBottomColor: constants.styleConstants.grey,
  },
  topicName: {
    padding: 20,
    fontSize: 35,
  },

  followingButtonContainer: {
    height: 40,
    width: Dimensions.get("window").width * 0.25,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: constants.styleConstants.orange,
  },
  followButtonContainer: {
    height: 40,
    width: Dimensions.get("window").width * 0.2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
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
