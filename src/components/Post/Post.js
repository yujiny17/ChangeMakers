import React from "react";
import {
  PixelRatio,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import Hyperlink from "react-native-hyperlink";

import { getUserPostActivity } from "../../graphql/queries";
import { createUserPostActivity } from "../../graphql/mutations";
import { getToken } from "../../UserCredentials";

import { S3Image } from "aws-amplify-react-native";

import UserBar from "./UserBar";
import PostActivityBar from "./PostActivityBar";
import constants from "../../constants/constants";
import { Linking } from "react-native";
import Autolink from "react-native-autolink";

class Post extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
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
        // console.log(
        //   "trying to create user activity with",
        //   username,
        //   newActivity
        // );
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

  _displayTopics(topics) {
    if (topics == null || topics?.length <= 0) return;
    return (
      <View style={styles.displayTopics}>
        {topics.map((topic, i) => (
          <TouchableOpacity
            activeOpacity={1.0}
            style={styles.topicInputContainer}
            key={i}
            onPress={() => {
              this.props.navigation.push("TopicScreen", { topic: topics[i] });
            }}
          >
            <Text style={styles.topicTextInputContainer}>{topics[i]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  render() {
    const post = this.props.post;
    let displayTopics = this._displayTopics(post.topics);
    // return (
    //   <View style={styles.container}>
    //     <UserBar onPress={() => this.focusPost()} />
    //     <TouchableOpacity
    //       key={post.id + "View"}
    //       style={styles.postContainer}
    //       onPress={() => this.focusPost(post.id)}
    //       activeOpacity={1.0}
    //     >
    //       <Text key={this.props.post.id} style={styles.titleText}>
    //         {post.title}
    //       </Text>
    //       <Text style={styles.textInputContainer}>{post.text}</Text>
    //       {DisplayPhotos(post.photos)}
    //     </TouchableOpacity>
    //     {DisplayTopics(post.topics)}
    //     <PostActivityBar
    //       post={post}
    //       focusPost={() => this.focusPost()}
    //       focused={this.props.focusPost}
    //       navigation={this.props.navgiation}
    //     />
    //   </View>
    // );
    return (
      <View style={styles.container}>
        <UserBar
          username={post.username}
          loadPostUser={true}
          navigation={this.props.navigation}
        />
        <View
          key={post.id + "View"}
          style={styles.postContainer}
          // onPress={() => this.focusPost(post.id)}
          // activeOpacity={1.0}
        >
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => this.focusPost(post.id)}
          >
            <Text key={this.props.post.id} style={styles.titleText}>
              {post.title}
            </Text>
          </TouchableOpacity>

          <Autolink
            text={post.text}
            url
            linkStyle={{ fontSize: 20, color: "blue" }}
            style={styles.textInputContainer}
          >
            {/* <Text style={styles.textInputContainer}>{post.text}</Text> */}
          </Autolink>

          {DisplayPhotos(post.photos)}
        </View>
        {displayTopics}
        <PostActivityBar
          post={post}
          focusPost={() => this.focusPost()}
          focused={this.props.focusPost}
          navigation={this.props.navgiation}
        />
      </View>
    );
  }
}
{
  /* <Hyperlink
            linkDefault={true}
            linkStyle={{ color: "#0000EE" }}
            onPress={(url) => {
              console.log("link pressed");
              Linking.openURL(url);
            }}
          > */
}

const DisplayPhotos = (photos) => {
  if (photos == null || photos?.length <= 0) return;
  return (
    <View style={styles.displayPhotos}>
      {photos.map((photoId, i) => (
        <S3Image imgKey={photoId} style={styles.postPhoto} key={i} />
      ))}
    </View>
  );
};

export default function (props) {
  const navigation = useNavigation();
  return <Post {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get("window").height,
    width: 100 + "%",
    backgroundColor: constants.styleConstants.postBackgroundColor,
    borderBottomWidth: constants.styleConstants.betweenPostsWidth,
    borderBottomColor: constants.styleConstants.grey,
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
    paddingLeft: 10,
  },
  textInputContainer: {
    width: 100 + "%",
    color: constants.styleConstants.black,
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 20,
    flexGrow: 1,
  },
  displayTopics: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 5,
  },
  topicInputContainer: {
    marginLeft: 5,
    backgroundColor: constants.styleConstants.orange,
    borderColor: constants.styleConstants.orange,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topicTextInputContainer: {
    color: constants.styleConstants.white,
    paddingHorizontal: 5,
    fontSize: 18,
  },
  displayPhotos: {
    width: Dimensions.get("window").width * 0.95,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    // paddingHorizontal: 10,
  },
  postPhoto: {
    height: Dimensions.get("window").width * 0.95,
    width: Dimensions.get("window").width * 0.95,
  },
});
