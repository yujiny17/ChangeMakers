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
import { S3Image } from "aws-amplify-react-native";
import Storage from "@aws-amplify/storage";

import { getPhoto, listUsers } from "../../graphql/queries";

import constants from "../../constants/constants";
import UserResult from "../Search/UserResult";

class FollowSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: "",
      followers: null,
      following: null,
      results: null,
    };
  }

  _startsWith(user, query) {
    const username = user.username;
    // console.log("examining user", username, query);
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

  _body() {
    return (
      <ScrollView style={styles.bodyContainer}>
        {this.state.results.map((user, i) => (
          <UserResult user={user} key={i} />
        ))}
      </ScrollView>
    );
  }

  componentDidMount() {
    const focus = this.props.route.params.focus;
    const followers = this.props.route.params.followers;
    const following = this.props.route.params.following;
    let results;
    if (focus == "followers") {
      results = followers;
    } else {
      results = following;
    }
    this.setState({
      focus: results,
      followers: followers,
      following: following,
      results: results,
    });
    console.log(this.state);
  }

  render() {
    let body;
    // let focus = this.props.route.params.focus;
    // let followers = this.props.route.params.followers;
    // let following = this.props.route.params.following;
    if (this.state.results != null) {
      body = this._body();
    }

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
        <View style={styles.focusTextContainer}>
          <TouchableOpacity style={styles.followersTextContainer}>
            <View style={styles.followersTextContainer2}>
              <Text style={{ textAlign: "center" }}>Followers</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followingTextContainer}>
            <View style={styles.followersTextContainer2}>
              <Text style={{ textAlign: "center" }}>Following</Text>
            </View>
          </TouchableOpacity>
        </View>
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

  bodyContainer: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    padding: 5,
    backgroundColor: "yellow",
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
