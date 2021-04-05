// not being used

import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";

import { listUsers } from "../../graphql/queries";

import constants from "../../constants/constants";

class SearchBar extends React.Component {
  constructor(props) {
    // can declare state and props (this.***) here
    // changing state will cause rerender
    super(props);
    this.state = {
      users: null,
    };

    // use to autofocus
    // this.searchComponentRef = React.createRef();
  }

  componentDidMount() {
    // this.searchComponentRef.current.focus();
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
    console.log("users", users);
    if (users == null) {
      try {
        // let response = await API.graphql(graphqlOperation(listUsers));
        // users = response.data.listUsers.items;
        users = [{ username: "testUser", email: "yamahara@princeton.edu" }];
        this.props.setUsers(users);
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
    console.log("Results are", results);
    this.props.setResults(results);
    return results;
  }

  render() {
    console.log("SearchBar", this.state, "and props", this.props);

    return (
      <View
        style={{
          width: Dimensions.get("window").width * 0.7,
          height: 85 + "%",
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          marginTop: 2,
          backgroundColor: constants.styleConstants.grey,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginRight: 5,
            //   height: 100 + "%",
          }}
        >
          <Icon
            name="search-outline"
            type="ionicon"
            color="rgb(187,187,189)"
            style={styles.icon}
            containerStyle={styles.iconContainer}
            size={20}
          />
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          // autoFocus={true}
          // ref={this.searchComponentRef}
          onChangeText={(input) => this._handleSearch(input)}
          placeholder="Search"
          placeholderTextColor="rgb(187,187,189)"
          spellcheck={false}
          style={{
            //   backgroundColor: "black",
            opacity: 1,
            width: Dimensions.get("window").width * 0.7,
            //   height: 100 + "%",
            right: 35,
            paddingHorizontal: 35,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        />
      </View>
    );
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    // alignItems: "center",
    // justifyContent: "flex-start",
  },
  headerStyle: {
    backgroundColor: constants.styleConstants.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.styleConstants.black,
    shadowOpacity: 0,
  },
  searchBarText: {
    flexGrow: 1,
    width: 100 + "%",
    backgroundColor: "black",
    fontSize: 15,
  },
});
