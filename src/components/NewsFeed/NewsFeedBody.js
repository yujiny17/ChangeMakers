import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { API, graphqlOperation } from "aws-amplify";

// import { connect } from "react-redux";
// import { fetchPosts } from "../../actions/NewsFeed";
import { listPersonalTimelinesByOwner } from "../../graphql/queries";

import { getToken } from "../../UserCredentials";

import Post from "../Post/Post";
import constants from "../../constants/constants";

class NewsFeedBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: "",
    };
  }

  async componentDidMount() {
    console.log("news feed body is about to mount");
    // get user's timeline
    let user = await getToken();
    let username = user.username;
    let posts;
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
      // console.log("and posts are", posts.post);
    } catch (error) {
      console.log("Get user post activity error", error);
    }
    this.setState({ data: posts, loading: false });
    // this.props.fetchPosts();
  }

  _renderPost({ item }) {
    // console.log("rendering item", item);
    let post = item.post;
    return <Post post={post} key={post.id} focusPost={false}></Post>;
  }

  render() {
    if (this.state.loading) {
      return <Text style={{ color: "red", fontSize: 30 }}>Loading!!</Text>;
    } else if (!this.state.loading && this.state.data != null) {
      return (
        <FlatList
          data={this.state.data}
          renderItem={this._renderPost}
          keyExtractor={(item) => item.id}
          style={{ width: 100 + "%" }}
        ></FlatList>
      );
    } else {
      return (
        <View style={styles.container}>
          {/* <Text style={{ color: "red", fontSize: 30 }}>ERROR</Text> */}
        </View>
      );
    }
  }
}

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
export default NewsFeedBody;

const styles = StyleSheet.create({
  container: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    // justifyContent: "center",
  },
});
