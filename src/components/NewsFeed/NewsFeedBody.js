import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/NewsFeed";

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
    console.log("about to mount");
    this.props.fetchPosts();
  }

  render() {
    if (this.state.loading) {
      return (
        <Text style={{ color: "red", fontSize: 30 }}>I'm still loading!!</Text>
      );
    } else if (this.state.error) {
      return <Text style={{ color: "red", fontSize: 30 }}>ERROR</Text>;
    }

    // let posts = this.props.data;
    // for (var post of posts) {
    //   console.log("Post", post.title);
    // }

    return (
      <View>
        {this.props.data.map((post) => (
          <View key={post.id + "View"} style={styles.mainContainer}>
            <Text key={post.id}>{post.title}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FCFCFC",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#323232",
    paddingVertical: 15,
  },
});

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
