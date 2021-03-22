import React from "react";
import { Dimensions, FlatList, View, Text } from "react-native";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/NewsFeed";
import Post from "../Post";
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

  componentDidMount() {
    console.log("news feed body is about to mount");
    this.props.fetchPosts();
  }

  _renderPost({ item }) {
    return <Post post={item} key={item.id}></Post>;
  }

  render() {
    if (this.state.loading) {
      return <Text style={{ color: "red", fontSize: 30 }}>Loading!!</Text>;
    } else if (!this.state.loading && this.props.data.length > 0) {
      return (
        <FlatList
          data={this.props.data}
          renderItem={this._renderPost}
          keyExtractor={(item) => item.id}
          style={{}}
        ></FlatList>
      );
    } else {
      return <Text style={{ color: "red", fontSize: 30 }}>ERROR</Text>;
    }
  }
}

function mapStateToProps(state) {
  return {
    data: state.newsFeed.data,
    loading: state.loading,
    error: state.error,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()), // field key : (parameters) => dispatch function
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedBody);
