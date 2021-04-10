import React from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";

import { getUser } from "../../graphql/queries";

import constants from "../../constants/constants";
import UserResult from "../Search/UserResult";

class FollowSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: "followers",
      followers: [],
      following: [],
      results: null,
    };
  }

  _startsWith(user, query) {
    const username = user.username;
    if (username.startsWith(query)) {
      return true;
    }
    return false;
  }

  async _handleSearch(input) {
    const focus = this.state.focus;
    let users;
    if (focus == "followers") {
      users = this.state.followers;
    } else {
      users = this.state.following;
    }

    let results;
    // filter based on input
    input = input.trim();
    results = users.filter((user) => this._startsWith(user, input));
    // console.log("Results are", results);
    this.setState({ results: results });
    return;
  }

  async _getFollowersfromRelationships(list) {
    let followers = [];
    await Promise.all(
      list.map(async (item) => {
        let resp = await API.graphql(
          graphqlOperation(getUser, { username: item.followerId })
        );
        followers.push(resp.data.getUser);
      })
    );
    return followers;
  }

  async _getFollowingfromRelationships(list) {
    let followers = [];
    await Promise.all(
      list.map(async (item) => {
        let resp = await API.graphql(
          graphqlOperation(getUser, { username: item.followeeId })
        );
        followers.push(resp.data.getUser);
      })
    );
    return followers;
  }

  async componentDidMount() {
    const focus = this.props.route.params.focus;
    let followers = [];
    let following = [];
    let results = [];

    const followerRelationships = this.props.route.params.followers;
    const followingRelationships = this.props.route.params.following;

    followers = await this._getFollowersfromRelationships(
      followerRelationships
    );
    following = await this._getFollowingfromRelationships(
      followingRelationships
    );

    if (focus == "followers") {
      results = followers;
    } else {
      results = following;
    }
    this.setState({
      focus: focus,
      followers: followers,
      following: following,
      results: results,
    });
    // console.log(this.props);
  }

  _focus(option) {
    if (option != this.state.focus) {
      if (option == "followers") {
        this.setState({ focus: option, results: this.state.followers });
      } else {
        this.setState({ focus: option, results: this.state.following });
      }
    }
  }

  _optionBar() {
    if (this.state.focus == "followers") {
      return (
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={styles.focusedOptionContainer}
            onPress={() => this._focus("followers")}
          >
            <Text style={styles.topicsText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => this._focus("following")}
          >
            <Text style={styles.usersText}>Following</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => this._focus("followers")}
          >
            <Text style={styles.topicsText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.focusedOptionContainer}
            onPress={() => this._focus("following")}
          >
            <Text style={styles.usersText}>Following</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _body() {
    // console.log("results", this.state.results);
    // if just switched, no applicable results will have been
    // loaded yet
    if (this.state.results == null) return;
    return (
      <ScrollView style={styles.bodyContainer}>
        {this.state.results.map((user, i) => (
          <UserResult user={user} key={i} />
        ))}
      </ScrollView>
    );
  }

  render() {
    // let focus = this.props.route.params.focus;
    // let followers = this.props.route.params.followers;
    // let following = this.props.route.params.following;

    let optionBar = this._optionBar();
    let body = this._body();

    return (
      <View style={styles.container}>
        <View style={styles.headerPosition}>
          <View style={styles.headerContainer}>
            <View style={styles.backButtonContainer}>
              <Icon
                name="chevron-back-outline"
                type="ionicon"
                color="rgb(0, 122, 255)"
                style={styles.backButton}
                containerStyle={styles.backButtonContainer2}
                size={35}
                onPress={() => this.props.navigation.pop()}
              />
            </View>
            <View style={styles.searchBarContainer}>
              <View style={styles.searchIconContainer}>
                <Icon
                  name="search-outline"
                  type="ionicon"
                  color="rgb(187,187,189)"
                  style={styles.icon}
                  // containerStyle={styles.iconContainer}
                  size={20}
                />
              </View>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                autoFocus={true}
                // ref={this.searchComponentRef}
                onChangeText={(input) => this._handleSearch(input)}
                placeholder="Search"
                placeholderTextColor="rgb(187,187,189)"
                spellcheck={false}
                style={styles.textInput}
              />
            </View>
          </View>
        </View>
        {optionBar}
        {body}
      </View>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <FollowSearchScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    flexDirection: "column",
    justifyContent: "flex-start",
    // justifyContent: "center",
    alignItems: "center",
  },

  headerPosition: {
    flexDirection: "column",
    justifyContent: "flex-end",
    width: 100 + "%",
    height: 15 + "%",
    borderBottomWidth: 2,
    borderBottomColor: "rgb(246, 246, 246)",
  },
  headerContainer: {
    width: 100 + "%",
    // height: 8 + "%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    backgroundColor: constants.styleConstants.white,
  },
  backButtonContainer: {
    height: 100 + "%",
    width: 15 + "%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backButtonContainer2: {
    flexDirection: "column",
    justifyContent: "center",
  },
  searchBarContainer: {
    width: 80 + "%",
    height: 80 + "%",
    borderRadius: 20,
    right: 10,
    // bottom: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: constants.styleConstants.grey,
  },
  searchIconContainer: {
    height: 100 + "%",
    flexDirection: "column",
    justifyContent: "center",
    left: 8,
    // backgroundColor: "blue",
  },
  textInput: {
    height: 100 + "%",
    width: 100 + "%",
    // backgroundColor: "white",
    opacity: 1,
    right: 25,
    paddingHorizontal: 35,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    fontSize: 15,
  },

  optionBar: {
    height: 50,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
  },
  optionContainer: {
    width: Dimensions.get("window").width / 2,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: constants.styleConstants.grey,
    backgroundColor: constants.styleConstants.white,
    borderWidth: 3,
  },
  focusedOptionContainer: {
    width: Dimensions.get("window").width / 2,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: constants.styleConstants.orange,
    backgroundColor: constants.styleConstants.white,
    borderWidth: 3,
  },
  topicsText: {
    padding: 8,
    fontSize: 20,
  },
  usersText: {
    padding: 8,
    fontSize: 20,
  },

  bodyContainer: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    padding: 5,
  },
  focusTextContainer: {
    // flex: 1,
    height: constants.styleConstants.rowHeight,
    width: 100 + "%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "blue",
  },
  followersTextContainer: {
    height: 100 + "%",
    flexDirection: "row",
    justifyContent: "center",
  },
  followersTextContainer2: {
    // flex: 1,
    height: 20,
    width: Dimensions.get("window").width * 0.5,
    // backgroundColor: "red",
    flexDirection: "column",
    justifyContent: "center",
  },
});
