import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "react-native-elements";
import { API, graphqlOperation } from "aws-amplify";

// import { connect } from "react-redux";
// import { fetchPosts } from "../../actions/NewsFeed";
import {
  listPersonalTimelinesByOwner,
  listPostsByPopularity,
} from "../../graphql/queries";

import { getToken } from "../../UserCredentials";

import Post from "../Post/Post";
import constants from "../../constants/constants";
import { Dimensions } from "react-native";

class NewsFeedBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      globalPosts: [],
      loading: true,
      error: "",
      focus: "home",
    };
  }

  async getPosts(username) {
    let posts = [];
    try {
      // get user's timeline
      console.log("getting user timeline for", username);
      const resp = await API.graphql(
        graphqlOperation(listPersonalTimelinesByOwner, {
          username: username,
          sortDirection: "DESC",
        })
      );
      posts = resp.data.listPersonalTimelinesByOwner.items;
      // console.log("timeline posts are", posts);
    } catch (error) {
      console.log("Get home timeline error", error);
    }
    return posts;
  }

  async getGlobalPosts() {
    let posts = [];
    try {
      const resp = await API.graphql(
        graphqlOperation(listPostsByPopularity, {
          type: "post",
          sortDirection: "DESC",
        })
      );
      posts = resp.data.listPostsByPopularity.items;
      // console.log("global timeline", posts);
    } catch (error) {
      console.log("Get global timeline error", error);
    }
    return posts;
  }

  async componentDidMount() {
    // get user's timeline
    let user = await getToken();
    let username = user.username;
    let posts = [];
    let globalPosts = [];

    // posts = await this.getPosts(username);
    // globalPosts = await this.getGlobalPosts();
    posts = [
      {
        post: {
          createdAt: "2021-04-07T06:05:30.913Z",
          downvote: 0,
          id: "c4610c7b-981a-458c-9774-955b3fbc05e3",
          misinformation: 0,
          photos: [],
          text: "",
          title: "I love animals",
          topics: ["dog", "cat"],
          totalvote: 0,
          type: "post",
          updatedAt: "2021-04-07T18:48:02.818Z",
          upvote: 0,
          username: "testUser3",
        },
      },
    ];

    this.setState({ posts: posts, globalPosts: globalPosts, loading: false });
  }

  _focus(option) {
    if (option != this.state.focus) {
      this.setState({ focus: option });
    }
  }

  _header() {
    if (this.state.focus == "home") {
      return (
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => this._focus("home")}
          >
            <View style={styles.focusTextContainer}>
              <Text style={styles.focusText}>Home</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.betweenContainer} />
          <TouchableOpacity
            style={styles.focusedOptionContainer}
            onPress={() => this._focus("world")}
          >
            <View style={styles.nonFocusTextContainer}>
              <Text style={styles.nonFocusText}>World</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={styles.focusedOptionContainer}
            onPress={() => this._focus("home")}
          >
            <View style={styles.nonFocusTextContainer}>
              <Text style={styles.nonFocusText}>Home</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.betweenContainer} />
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => this._focus("world")}
          >
            <View style={styles.focusTextContainer}>
              <Text style={styles.focusText}>World</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
  _renderPost({ item }) {
    console.log("rendering item", item);
    let post = item.post;
    return <Post post={post} key={post.id} focusPost={false}></Post>;
  }
  _renderGlobalPost({ item }) {
    // console.log("rendering item", item);
    let post = item;
    return <Post post={post} key={post.id} focusPost={false}></Post>;
  }

  _body() {
    if (this.state.focus == "home") {
      return (
        <FlatList
          data={this.state.posts}
          renderItem={this._renderPost}
          keyExtractor={(item) => item.id}
          style={{ width: 100 + "%" }}
        />
      );
    } else {
      return (
        <FlatList
          data={this.state.globalPosts}
          renderItem={this._renderGlobalPost}
          keyExtractor={(item) => item.id}
          style={{ width: 100 + "%" }}
        />
      );
    }
  }
  render() {
    let newsFeedHeader = this._header();
    let body = this._body();
    if (!this.state.loading && this.state.posts != null) {
      return (
        <View style={styles.container}>
          {newsFeedHeader}
          {body}
        </View>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
}

export default NewsFeedBody;

const styles = StyleSheet.create({
  optionBar: {
    height: 40,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: constants.styleConstants.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.styleConstants.grey,
  },
  optionContainer: {
    height: 100 + "%",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 50,
  },
  focusedOptionContainer: {
    height: 100 + "%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  betweenContainer: {
    height: 75 + "%",
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
  },
  focusTextContainer: {
    height: 100 + "%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: 100 + "%",
    paddingHorizontal: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  nonFocusTextContainer: {
    height: 100 + "%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: 100 + "%",
    paddingHorizontal: 10,
  },
  focusText: {
    color: constants.styleConstants.black,
    fontWeight: "bold",
  },
  nonFocusText: {
    color: constants.styleConstants.black,
  },

  container: {
    // height: 100 + "%",
    width: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: constants.styleConstants.blue,
    alignItems: "center",
    // justifyContent: "center",
  },
  loadingContainer: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    backgroundColor: constants.styleConstants.white,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

// function mapStateToProps(state) {
//   return {
//     data: state.newsFeed.data,
//     loading: state.loading,
//     error: state.error,
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchPosts: () => dispatch(fetchPosts()), // field key : (parameters) => dispatch function
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedBody);
