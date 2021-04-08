import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native";

import {
  getUserPostActivity,
  listCommentsbyPost,
  getUser,
} from "../../graphql/queries";
import {
  createUserPostActivity,
  updatePost,
  updateUserPostActivity,
  createComment,
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
        username: null,
        comments: [],
        commentUsers: [],
        commentInputHeight: 40,
        userComment: "",
      };
    }
    this.commentRef = React.createRef();
  }

  async loadUserActivity(username) {
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

  async _getComments(postId) {
    let comments = [];
    try {
      const resp = await API.graphql(
        graphqlOperation(listCommentsbyPost, {
          postId: postId,
          sortDirection: "DESC",
        })
      );
      comments = resp.data.listCommentsbyPost.items;
      // console.log("got comments", comments);
      return comments;
    } catch (error) {
      console.log("list comments error", error);
    }
  }

  async componentDidMount() {
    let stateActivity = [];
    let statePost = [];
    let publicMisinformation = false;
    let userMisinformation = false;
    let username = "";
    let comments = [];
    let commentUsers = [];

    let user = await getToken();
    username = user.username;

    // FOR TESTING PURPOSES
    // this.setState({
    //   loadingActivity: false,
    //   user: {
    //     username: "testUser3",
    //   },
    //   comments: [
    //     {
    //       createdAt: "2021-04-08T02:39:37.080Z",
    //       id: "da6ebe87-8a7a-4221-b3f9-33d42eef40db",
    //       postId: "c4610c7b-981a-458c-9774-955b3fbc05e3",
    //       text:
    //         "I also love animals very much and would like to play with a few someday!",
    //       updatedAt: "2021-04-08T02:39:37.080Z",
    //       user: "testuser3",
    //       username: "testUser3",
    //     },
    //   ],
    //   commentUsers: [
    //     {
    //       username: "testUser3",
    //     },
    //   ],
    // });
    // return;

    let activity = await this.loadUserActivity(username);
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

    comments = await this._getComments(post.id);
    commentUsers = await this._getUsersofComments(comments);

    this.setState({
      loadingActivity: false,
      activity: stateActivity,
      post: statePost,
      publicMisinformation: publicMisinformation,
      userMisinformation: userMisinformation,
      username: username,
      comments: comments,
      commentUsers: commentUsers,
    });

    // console.log("Mounted and state is now", this.state);

    // focus comment text component
    if (this.commentRef != null) {
      this.commentRef?.current.focus();
    }
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
    // console.log("boundary", boundary, "and score", post.misinformation);
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

  _commentButton() {
    if (this.props.focused) {
      return (
        <Icon
          name="comment"
          type="evilicon"
          size={constants.styleConstants.iconSize}
          color={constants.styleConstants.black}
          containerStyle={{ flex: 1 }}
          // onPress={() => this.props.focusPost()}

          // on press bring comment bar into focus
        />
      );
    } else {
      return (
        <Icon
          name="comment"
          type="evilicon"
          size={constants.styleConstants.iconSize}
          color={constants.styleConstants.black}
          containerStyle={{ flex: 1 }}
          onPress={() => this.props.focusPost()}
        />
      );
    }
  }

  updateSize(height) {
    this.setState({ commentInputHeight: height });
  }

  async submitComment() {
    this.commentRef.current.blur();
    try {
      const input = {
        username: this.state.username,
        postId: this.state.post.id,
        text: this.state.userComment,
      };
      const resp = await API.graphql(
        graphqlOperation(createComment, { input: input })
      );
      comment = resp.data.createComment;
      console.log("created comment", comment);
    } catch (error) {
      console.log("Create comment error", error);
    }
    let comments = this.state.comments;
    comments.push(comment);
    this.setState({ comments: comments });
  }

  async _getUsersofComments(comments) {
    let users = [];
    try {
      await Promise.all(
        comments.map(async (comment) => {
          let resp = await API.graphql(
            graphqlOperation(getUser, { username: comment.username })
          );
          let user = resp.data.getUser;
          users.push(user);
        })
      );
    } catch (error) {
      console.log("error getting comment users", error);
    }
    return users;
  }

  _displayComments() {
    let comments = this.state.comments;
    if (comments == null || comments?.length <= 0 || !this.props.focused)
      return;
    let users = this.state.commentUsers;
    // console.log("users of comments are", users);

    return (
      <View
        style={{
          width: 100 + "%",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {comments.map((comment, i) => (
          <TouchableOpacity
            style={{
              width: 100 + "%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingVertical: 5,
            }}
            onPress={() =>
              this.props.navigation.navigate("ProfileScreen", {
                user: users[i],
              })
            }
            activeOpacity={0.8}
            key={i}
          >
            <View style={styles.userPhotoContainer}>
              {users[i].photo ? (
                <S3Image imgKey={users[i].photo} style={styles.userPhoto} />
              ) : (
                <Icon
                  name="account-circle"
                  type="material-community"
                  color="black"
                  size={40}
                />
              )}
              {/* <Icon
                name="account-circle"
                type="material-community"
                color="black"
                size={40}
              /> */}
            </View>
            <View
              style={{
                height: 100 + "%",
                width: Dimensions.get("window").width - 50,
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingHorizontal: 10,
              }}
            >
              <View style={styles.userNameContainer}>
                <Text style={styles.userName}>{users[i].username}</Text>
              </View>
              <Text style={{ fontSize: 20 }}>{comment.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  _commentBar() {
    if (this.props.focused) {
      return (
        <TouchableOpacity style={styles.commentBar} activeOpacity={1.0}>
          <View style={styles.userPhoto}>
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
          </View>

          <View
            style={{
              width: Dimensions.get("window").width * 0.8,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <TextInput
              ref={this.commentRef}
              placeholder={"Add a comment"}
              placeholderTextColor="#808080"
              backgroundColor={"#F7F7F7"}
              onChangeText={(input) => this.setState({ userComment: input })}
              spellCheck={false}
              autoCapitalize={"none"}
              autoCompleteType={"off"}
              multiline={true}
              textAlignVertical={"top"}
              maxLength={50000}
              scrollEnabled={true}
              // numberOfLines={1}
              onContentSizeChange={(e) =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
              onSubmitEditing={(e) => this.submitComment(e.text)}
              style={{
                flex: 1,
                width: Dimensions.get("window").width * 0.7,
                color: constants.styleConstants.black,
                fontSize: 20,
                height: Math.max(40, this.state.commentInputHeight),
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }
  }
  render() {
    const post = this.props.post;
    let userMisinformation = this._userMisinformation();
    let publicMisinformation = this._publicMisinformation();
    let misinformationButton = this._misinformationButton();
    let commentButton = this._commentButton();
    let comments = this._displayComments();
    let commentBar = this._commentBar();
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
            {commentButton}
            {misinformationButton}
          </View>
          {comments}
          {commentBar}
        </View>
      );
    }
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <PostActivityBar {...props} navigation={navigation} />;
}

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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
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

  ////////
  userPhotoContainer: {
    // flexDirection: "row",
    paddingHorizontal: 5,
  },
  userNameContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    fontWeight: "500",
  },
  ////////

  commentBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 5,
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 15,
  },

  userPhoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  commentContainer: {
    width: Dimensions.get("window").width * 0.8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
