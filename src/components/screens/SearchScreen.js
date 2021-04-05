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

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      results: null,
      error: "",
      url: "",
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
    let users = this.state.users;
    let results;

    // if have not made an API request yet, get list of users
    console.log("users", users, "made a request:", this.state.requestMade);
    if (users == null) {
      try {
        let response = await API.graphql(graphqlOperation(listUsers));
        users = response.data.listUsers.items;
        // users = [
        //   {
        //     createdAt: "2021-04-04T21:40:10.542Z",
        //     email: "yamahara@princeton.edu",
        //     photo: "7c731802-e6ce-4fc6-a096-e790feea2eca",
        //     updatedAt: "2021-04-04T21:41:02.191Z",
        //     username: "testUser3",
        //   },
        //   {
        //     createdAt: "2021-04-04T17:28:27.483Z",
        //     email: "yamahara@princeton.edu",
        //     photo: null,
        //     updatedAt: "2021-04-04T17:29:41.628Z",
        //     username: "testUser",
        //   },
        //   {
        //     createdAt: "2021-04-04T21:37:42.836Z",
        //     email: "yamahara@princeton.edu",
        //     photo: null,
        //     updatedAt: "2021-04-04T21:37:42.836Z",
        //     username: "testUser2",
        //   },
        // ];
        this.state.users = users;
        console.log("list users", users);
      } catch (error) {
        console.log("Error listUsers", error);
      }
    } else {
      console.log("already loaded users", users);
    }

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

  render() {
    let body;
    if (this.state.users != null) {
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
        {body}
        {/* {this.state.users != null && (
          <ScrollView style={styles.bodyContainer}>
            {this.state.users.map((user, i) => (
              <UserResult user={user} key={i} />
            ))}
          </ScrollView>
        )} */}
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
    backgroundColor: "white",
  },
});
