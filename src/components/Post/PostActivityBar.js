import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
        publicMisinformation: false,
        userMisinformation: false, //user decision
        misinformationModalVisible: false,
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
    // return post.upvote - post.downvote;
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
    let stateActivity = [];
    let statePost = [];
    let publicMisinformation = false;
    let userMisinformation = false;

    let activity = await this.loadUserActivity();
    let post = this.props.post;

    // retrieved activity has extra fields _version, _deleted, _lastChangedAt
    stateActivity = {
      username: activity.username,
      postId: activity.postId,
      upvote: activity.upvote,
      downvote: activity.downvote,
      misinformation: activity.misinformation,
    };
    (userMisinformation = stateActivity.misinformation),
      (statePost = {
        id: post.id,
        username: post.username,
        upvote: post.upvote,
        downvote: post.downvote,
        totalvote: post.totalvote,
        misinformation: post.misinformation,
      });

    // fix negative upvotes downvotes or misinformation
    if (statePost.upvote < 0) statePost.upvote = 0;
    if (statePost.downvote < 0) statePost.downvote = 0;
    if (statePost.misinformation < 0) statePost.misinformation = 0;

    let boundary = Math.ceil((statePost.upvote + statePost.downvote) / 4);
    if (statePost.misinformation > boundary) {
      publicMisinformation = true;
    }

    this.setState({
      loadingActivity: false,
      activity: stateActivity,
      post: statePost,
      publicMisinformation: publicMisinformation,
      userMisinformation: userMisinformation,
    });

    // console.log("Mounted and state is now", this.state);
  }

  async _pressMisinformation() {
    // console.log("prev state", this.state);

    // if not set, set misinformation
    let activity = this.state.activity;
    let post = this.state.post;
    let publicMisinformation = this.state.publicMisinformation;
    let userMisinformation = this.state.userMisinformation;

    if (!userMisinformation) {
      activity.misinformation = true;
      post.misinformation += 1;
      userMisinformation = true;
    }
    // set as not misinformation
    else {
      activity.misinformation = false;
      userMisinformation = false;
      if (post.misinformation > 0) {
        post.misinformation -= 1;
      }
    }

    // check if still marked as misinfo
    let boundary = Math.ceil((post.upvote + post.downvote) / 4);
    console.log("boundary", boundary, "and score", post.misinformation);
    if (post.misinformation > boundary) {
      publicMisinformation = true;
    } else {
      publicMisinformation = false;
    }

    this.setState({
      activity: activity,
      post: post,
      userMisinformation: userMisinformation,
      publicMisinformation: publicMisinformation,
    });

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

    // update post misinformation count
    try {
      const resp = await API.graphql(
        graphqlOperation(updatePost, { input: post })
      );
      let updatedPost = resp.data.updatePost;
      console.log("updated post to", updatedPost);
    } catch (error) {
      console.log("Update post error", error);
    }
  }

  _publicMisinformation() {
    if (this.state.publicMisinformation) {
      if (this.state.post.misinformation > 1) {
        return (
          <View style={styles.publicMis}>
            <Icon
              name="exclamation"
              type="evilicon"
              size={20}
              color="red"
              containerStyle={{}}
            />
            <Text style={styles.publicMisText}>
              This post has been marked by {this.state.post.misinformation}{" "}
              users as misinformation
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.publicMis}>
            <Icon
              name="exclamation"
              type="evilicon"
              size={20}
              color="red"
              containerStyle={{}}
            />
            <Text style={styles.publicMisText}>
              This post has been marked by {this.state.post.misinformation} user
              as misinformation.
            </Text>
          </View>
        );
      }
    }
  }

  _userMisinformation() {
    if (this.state.userMisinformation) {
      return (
        <View style={styles.publicMis}>
          <Icon
            name="exclamation"
            type="evilicon"
            size={20}
            color="red"
            containerStyle={{}}
          />
          <Text style={styles.publicMisText}>
            You have marked this post as misinformation
          </Text>
        </View>
      );
    }
    return null;
  }

  _misinformationButton() {
    if (this.state.userMisinformation) {
      return (
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => this._pressMisinformation()}
          >
            <Icon
              name="exclamation"
              type="evilicon"
              size={constants.styleConstants.iconSize}
              color="red"
              containerStyle={{}}
            />
          </Pressable>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            height: 100 + "%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            // style={[styles.button, styles.buttonOpen]}
            style={styles.misinformationContainer}
            onPress={() => this._pressMisinformation()}
          >
            <Icon
              name="exclamation"
              type="evilicon"
              size={constants.styleConstants.iconSize}
              color="grey"
              containerStyle={{}}
            />
          </Pressable>
        </View>
      );
    }
  }

  render() {
    const post = this.props.post;
    let userMisinformation = this._userMisinformation();
    let publicMisinformation = this._publicMisinformation();
    let misinformationButton = this._misinformationButton();
    // if loading return generic user bar with no actions
    if (this.state.loadingActivity) {
      return null;
      // return (
      //   <View style={styles.container}>
      //     {publicMisinformation}
      //     <View style={styles.iconBar}>
      //       <View style={styles.voteContainer}>
      //         <Icon
      //           name="arrow-up-outline"
      //           type="ionicon"
      //           size={25}
      //           color={constants.styleConstants.black}
      //         />
      //         <View
      //           style={{
      //             height: 100 + "%",
      //             justifyContent: "center",
      //             marginHorizontal: 5,
      //           }}
      //         ></View>
      //         <Icon
      //           name="arrow-down-outline"
      //           type="ionicon"
      //           size={25}
      //           color={constants.styleConstants.black}
      //         />
      //       </View>
      //       <Icon
      //         name="comment"
      //         type="evilicon"
      //         size={constants.styleConstants.iconSize}
      //         color={constants.styleConstants.black}
      //         containerStyle={{ flex: 1 }}
      //       />
      //     </View>
      //   </View>
      // );
    }
    // once user activity has loaded
    else {
      return (
        <View style={styles.container}>
          {publicMisinformation}
          {userMisinformation}
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
                <Text>{Math.abs(this.state.post.totalvote)}</Text>
              </View>
              {this.state.activity.downvote ? (
                <Icon
                  name="arrow-down-outline"
                  type="ionicon"
                  size={25}
                  color={constants.styleConstants.darkOrange}
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
            {misinformationButton}
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
  publicMis: {
    width: 100 + "%",
    // paddingVertical: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publicMisText: {
    paddingHorizontal: 2,
    fontSize: 12,
    color: "red",
  },
  iconBar: {
    height: constants.styleConstants.rowHeight,
    width: 100 + "%",
    // paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  voteContainer: {
    flex: 1,
    height: 100 + "%",
    // width: 100 + "%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  voteTextContainer: {
    height: 100 + "%",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  misinformationContainer: {
    // flex: 1,
    width: 100 + "%",
    height: 100 + "%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  misinformationTextContainer: {
    height: 100 + "%",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  misinformationText: {
    color: "red",
  },

  markedMisText: {
    fontSize: 12,
    color: "red",
  },
});
