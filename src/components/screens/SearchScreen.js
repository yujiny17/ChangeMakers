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

import { listUsers, listTopics } from "../../graphql/queries";

import constants from "../../constants/constants";
import UserResult from "../Search/UserResult";
import TopicResult from "../Search/TopicResult";
class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      topics: null,
      results: null,
      error: "",
      url: "",
      focus: "topics",
    };
  }

  _startsWith(string, query) {
    if (string.startsWith(query)) return true;
    return false;
  }

  async _handleSearch(input) {
    if (input == null || input == "") {
      this.setState({ results: null });
      return null;
    }

    if (this.state.focus == "users") {
      let users = this.state.users;
      let results;

      // if have not made an API request yet, get list of users
      console.log("users", users, "made a request:", this.state.requestMade);
      if (users == null) {
        try {
          let response = await API.graphql(graphqlOperation(listUsers));
          users = response.data.listUsers.items;

          this.state.users = users;
          // console.log("list users", users);
        } catch (error) {
          console.log("Error listUsers", error);
        }
      } else {
        console.log("already loaded users", users);
      }

      // filter based on input
      input = input.trim();
      results = users.filter((user) => this._startsWith(user.username, input));

      // console.log("Results are", results);
      this.setState({ results: results });
    } else {
      let topics = this.state.topics;

      let results;
      // if have not made an API request yet, get list of topics
      console.log("topics", topics, "made a request:", this.state.requestMade);
      if (topics == null) {
        try {
          let response = await API.graphql(graphqlOperation(listTopics));
          topics = response.data.listTopics.items;

          this.state.topics = topics;
          // console.log("list topics", topics);
        } catch (error) {
          console.log("Error listTopics", error);
        }
      } else {
        // console.log("already loaded topics", topics);
      }
      // filter based on input
      input = input.trim();
      results = topics.filter((topic) =>
        this._startsWith(topic.topic.toLowerCase(), input.toLowerCase())
      );
      // console.log("results are", results);
      this.setState({ results: results });
    }
  }

  _body() {
    // console.log("results", this.state.results);
    // if just switched, no applicable results will have been
    // loaded yet
    if (this.state.results == null) return;
    if (this.state.focus == "topics") {
      return (
        <ScrollView style={styles.bodyContainer}>
          {this.state.results.map((topic, i) => (
            <TopicResult topic={topic} key={i} />
          ))}
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.bodyContainer}>
          {this.state.results.map((user, i) => (
            <UserResult user={user} key={i} />
          ))}
        </ScrollView>
      );
    }
  }

  _focus(option) {
    if (option != this.state.focus) {
      this.setState({ focus: option, results: null });
    }
  }

  _optionBar() {
    if (this.state.focus == "topics") {
      return (
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={styles.focusedOptionContainer}
            onPress={() => this._focus("topics")}
          >
            <Text style={styles.topicsText}>Topics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => this._focus("users")}
          >
            <Text style={styles.usersText}>Users</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.optionBar}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() => this._focus("topics")}
          >
            <Text style={styles.topicsText}>Topics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.focusedOptionContainer}
            onPress={() => this._focus("users")}
          >
            <Text style={styles.usersText}>Users</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    let body;
    if (this.state.users != null || this.state.topics != null) {
      body = this._body();
    }
    let optionBar = this._optionBar();
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
  return <SearchScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomWidth: 4,
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
    backgroundColor: "white",
  },
});
