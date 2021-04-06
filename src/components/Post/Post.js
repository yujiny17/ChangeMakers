import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";

import { getUserPostActivity } from "../../graphql/queries";
import { createUserPostActivity } from "../../graphql/mutations";
import { getToken } from "../../UserCredentials";

import UserBar from "./UserBar";
import PostActivityBar from "./PostActivityBar";
import constants from "../../constants/constants";

class Post extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        screenWidth: 0,
        loadingActivity: true,
        activity: [],
      };
    }
  }

  async loadUserActivity() {
    let user = await getToken();
    let username = user.username;
    let post = this.props.post;
    // console.log("get activity for user and post", username, post.id);

    let activity;
    // get user post activity
    try {
      const resp = await API.graphql(
        graphqlOperation(getUserPostActivity, {
          username: username,
          postId: post.id,
        })
      );
      activity = resp.data.getUserPostActivity;
      console.log(
        "loaded user activity for (user, post)",
        "(" + username + ",",
        post.id + ")"
      );
      // console.log("user activity is", activity);
    } catch (error) {
      console.log("Get user post activity error", error);
    }

    // if no user activity, create new entry
    if (activity == null) {
      try {
        const newActivity = {
          username: username,
          postId: post.id,
          upvote: false,
          downvote: false,
          misinformation: false,
        };
        const resp = await API.graphql(
          graphqlOperation(createUserPostActivity, { input: newActivity })
        );
        activity = resp.data.createUserPostActivity;
        console.log("created user activity", activity);
      } catch (error) {
        console.log("Create user activity error", error);
      }
    }
    return activity;
  }

  async componentDidMount() {
    this.setState({ screenWidth: Dimensions.get("window").width });

    let activity = await this.loadUserActivity();
    // console.log(activity);
    this.setState({ loadingActivity: false, activity: activity });
  }

  focusPost() {
    if (!this.props.focusPost) {
      const post = this.props.post;
      const { navigation } = this.props;
      console.log("Post Focus for post:", post.id);
      navigation.navigate("PostFocus", { post: post });
    }
    return;
  }

  render() {
    const post = this.props.post;
    return (
      <View style={styles.container}>
        <UserBar onPress={() => this.focusPost()} />
        <TouchableOpacity
          key={post.id + "View"}
          style={styles.postContainer}
          onPress={() => this.focusPost(post.id)}
          activeOpacity={1.0}
        >
          <Text key={this.props.post.id} style={styles.titleText}>
            {post.title}
          </Text>
          <Image
            style={{ width: 100 + "%", height: 200 }}
            source={{
              uri:
                "https://www.therobinreport.com/wp-content/uploads/2015/09/activism_featured1-850x560.jpg",
            }}
          />
        </TouchableOpacity>
        <PostActivityBar post={post} focusPost={() => this.focusPost()} />
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <Post {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    backgroundColor: constants.styleConstants.postBackgroundColor,
    borderBottomWidth: constants.styleConstants.betweenPostsWidth,
    borderBottomColor: constants.styleConstants.grey,
    // justifyContent: "flex-start,"
    // paddingTop: 0,
  },
  postContainer: {
    justifyContent: "center",
    padding: 5,
  },
  titleText: {
    fontWeight: "bold",
    width: 100 + "%",
    fontWeight: "bold",
    color: constants.styleConstants.black,
    fontSize: 20,
  },
  // iconBar: {
  //   height: (constants.styleConstants.rowHeight * 4) / 5,
  //   padding: 5,
  //   paddingHorizontal: 15,
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  // voteContainer: {
  //   flex: 1.25,
  //   height: 100 + "%",
  //   // width: 100 + "%",
  //   flexDirection: "row",
  //   justifyContent: "center",
  // },
});
