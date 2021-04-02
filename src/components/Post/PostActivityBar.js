import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";

import { getUserPostActivity } from "../../graphql/queries";
import {
  createUserPostActivity,
  updatePost,
  updateUserPostActivity,
} from "../../graphql/mutations";
import { getToken } from "../../UserCredentials";

import constants from "../../constants/constants";

class PostActivityBar extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        loadingActivity: true,
        activity: [],
        post: [],
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
      console.log("loaded user activity");
      // console.log("loaded user activity", activity);
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

  _calculateTotalVote(post) {
    let upvote = post.upvote;
    let downvote = post.downvote;
    if (upvote > downvote) return upvote - downvote;
    else {
      return downvote - upvote;
    }
  }
  async _pressUpvote(toggle) {
    console.log("Making upvote", toggle);
    // console.log("Making upvote", toggle, "for", this.state.activity);

    // update state and post upvote count
    let activity = this.state.activity;
    let post = this.state.post;
    let currUpvote = activity.upvote;
    let currDownVote = activity.downvote;

    // user clicks on a non-toggled upvote
    if (toggle) {
      activity.upvote = true;
      post.upvote += 1;
      // if downvote was toggled, untoggle and subtract one
      if (activity.downvote) {
        activity.downvote = false;
        post.downvote -= 1;
      }
    }
    // user clicks on toggled upvote
    else {
      activity.upvote = false;
      post.upvote -= 1;
    }

    post.totalvote = this._calculateTotalVote(post);
    this.setState({ activity: activity });
    this.setState({ post: post });

    // console.log("new activity", activity);

    // change user activity DDB entry
    try {
      const resp = await API.graphql(
        graphqlOperation(updateUserPostActivity, { input: activity })
      );
      let updatedActivity = resp.data.updateUserPostActivity;
      console.log("updated user post activity");
      //   console.log("updated user post activity to", updatedActivity);
    } catch (error) {
      console.log("Update user post activity error", error);
    }

    // update post upvote count in DDB
    // console.log("current post", post);
    try {
      const resp = await API.graphql(
        graphqlOperation(updatePost, { input: post })
      );
      let updatedPost = resp.data.updatePost;
      //   console.log("updated post");
      console.log("updated post to", updatedPost);
    } catch (error) {
      console.log("Update post error", error);
    }
  }

  async _pressDownvote(toggle) {
    console.log("Making downvote", toggle);
    // console.log("Making downvote", toggle, "for", this.state.activity);

    // update state and post upvote count
    let activity = this.state.activity;
    let post = this.state.post;

    // user clicks on non-toggled downvote
    if (toggle) {
      activity.downvote = true;
      post.downvote += 1;
      // if upvote was toggled, untoggle and subtract one
      if (activity.upvote) {
        activity.upvote = false;
        post.upvote -= 1;
      }
    }
    // user clicks on toggled downvote
    else {
      activity.downvote = false;
      post.downvote -= 1;
    }

    post.totalvote = this._calculateTotalVote(post);
    this.setState({ activity: activity });
    this.setState({ post: post });

    // console.log("new activity", activity);

    // change user activity DDB entry
    try {
      const resp = await API.graphql(
        graphqlOperation(updateUserPostActivity, { input: activity })
      );
      let updatedActivity = resp.data.updateUserPostActivity;
      console.log("updated user post activity");
      // console.log("updated user post activity to", updatedActivity);
    } catch (error) {
      console.log("Update user post activity error", error);
    }

    // update post downvote count
    // console.log("current post", post);
    try {
      const resp = await API.graphql(
        graphqlOperation(updatePost, { input: post })
      );
      let updatedPost = resp.data.updatePost;
      console.log("updated post to", updatedPost);
      //   console.log("updated post");
    } catch (error) {
      console.log("Update post error", error);
    }
  }

  async componentDidMount() {
    let activity = await this.loadUserActivity();

    // retrieved activity has extra fields _version, _deleted, _lastChangedAt
    let stateActivity = {
      username: activity.username,
      postId: activity.postId,
      upvote: activity.upvote,
      downvote: activity.downvote,
      misinformation: activity.misinformation,
    };
    let post = this.props.post;
    let statePost = {
      id: post.id,
      username: post.username,
      upvote: post.upvote,
      downvote: post.downvote,
      totalvote: post.totalvote,
      misinformation: post.misinformation,
    };
    this.setState({
      loadingActivity: false,
      activity: stateActivity,
      post: statePost,
    });
  }

  render() {
    const post = this.props.post;
    // if loading return generic user bar with no actions
    if (this.state.loadingActivity) {
      return (
        <View activeOpacity={1.0} style={styles.container}>
          <View style={styles.iconBar}>
            <View style={styles.voteContainer}>
              <Icon
                name="arrow-up-outline"
                type="ionicon"
                size={25}
                color={constants.styleConstants.black}
              />
              <View
                style={{
                  height: 100 + "%",
                  justifyContent: "center",
                  marginHorizontal: 5,
                }}
              ></View>
              <Icon
                name="arrow-down-outline"
                type="ionicon"
                size={25}
                color={constants.styleConstants.black}
              />
            </View>
            <Icon
              name="comment"
              type="evilicon"
              size={constants.styleConstants.iconSize}
              color={constants.styleConstants.black}
              containerStyle={{ flex: 1 }}
            />
            <Icon
              name="exclamation"
              type="evilicon"
              size={constants.styleConstants.iconSize}
              // color={constants.styleConstants.black}
              color="red"
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>
      );
    }
    // once user activity has loaded
    else {
      return (
        <View style={styles.container}>
          <View style={styles.iconBar}>
            <View style={styles.voteContainer}>
              {this.state.activity.upvote ? (
                <Icon
                  name="arrow-up-outline"
                  type="ionicon"
                  size={25}
                  color={constants.styleConstants.orange}
                  onPress={() => this._pressUpvote(false)}
                />
              ) : (
                <Icon
                  name="arrow-up-outline"
                  type="ionicon"
                  size={25}
                  color={constants.styleConstants.black}
                  onPress={() => this._pressUpvote(true)}
                />
              )}
              <View style={styles.voteTextContainer}>
                <Text>{this.state.post.totalvote}</Text>
              </View>
              {this.state.activity.downvote ? (
                <Icon
                  name="arrow-down-outline"
                  type="ionicon"
                  size={25}
                  color={constants.styleConstants.orange}
                  onPress={() => this._pressDownvote(false)}
                />
              ) : (
                <Icon
                  name="arrow-down-outline"
                  type="ionicon"
                  size={25}
                  color={constants.styleConstants.black}
                  onPress={() => this._pressDownvote(true)}
                />
              )}
            </View>
            <Icon
              name="comment"
              type="evilicon"
              size={constants.styleConstants.iconSize}
              color={constants.styleConstants.black}
              containerStyle={{ flex: 1 }}
            />
            <View style={styles.misinformationContainer}>
              <Icon
                name="exclamation"
                type="evilicon"
                size={constants.styleConstants.iconSize}
                // color={constants.styleConstants.black}
                color="red"
              />
              <View style={styles.misinformationTextContainer}>
                <Text style={styles.misinformationText}>
                  {this.state.post.misinformation}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

export default PostActivityBar;

// export default function (props) {
//   const navigation = useNavigation();
//   return <Post {...props} navigation={navigation} />;
// }

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    flexDirection: "column",
    justifyContent: "center",
  },
  iconBar: {
    height: (constants.styleConstants.rowHeight * 4) / 5,
    width: 100 + "%",
    padding: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  voteContainer: {
    flex: 1.25,
    height: 100 + "%",
    // width: 100 + "%",
    flexDirection: "row",
    justifyContent: "center",
  },
  voteTextContainer: {
    height: 100 + "%",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  misinformationContainer: {
    flex: 1,
    height: 100 + "%",
    flexDirection: "row",
    alignContent: "center",
  },
  misinformationTextContainer: {
    height: 100 + "%",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  misinformationText: {
    color: "red",
  },
});
