import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import constants from "../../constants/constants";

class Post extends React.Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        screenWidth: 0,
      };
    }
  }

  componentDidMount() {
    this.setState({
      screenWidth: Dimensions.get("window").width,
    });
  }

  focusPost() {
    if (!this.props.focusPost) {
      const post = this.props.post;
      const { navigation } = this.props;
      console.log("Post Focus for post:", post.id);
      navigation.navigate("PostFocus", { post: post });
    }
    return;
  }

  render() {
    const imageHeight = Math.floor(this.state.screenWidth * 1.1);
    const imageUri =
      "https://media-exp1.licdn.com/dms/image/C4E03AQFoTpoq2QHAVA/profile-displayphoto-shrink_100_100/0/1588884556380?e=1620864000&v=beta&t=oaJ-DWkzGysRlkZDynxup5BK8qFpn-uEVmyQ1Tuu5qM";
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.userBar}
          onPress={() => this.focusPost()}
          activeOpacity={1.0}
        >
          <View style={styles.userPhotoName}>
            <Image
              style={styles.userPhoto}
              source={{
                uri: imageUri,
              }}
            />
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>Yujin</Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 30,
                textAlignVertical: "top",
              }}
            >
              ...
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          key={this.props.post.id + "View"}
          style={styles.postContainer}
          onPress={() => this.focusPost(this.props.post.id)}
          activeOpacity={1.0}
        >
          <Text key={this.props.post.id} style={styles.titleText}>
            {this.props.post.title}
          </Text>
          <Image
            style={{ width: 100 + "%", height: 200 }}
            source={{
              uri:
                "https://www.therobinreport.com/wp-content/uploads/2015/09/activism_featured1-850x560.jpg",
            }}
          />
        </TouchableOpacity>
        <View style={styles.iconBar}>
          <Icon
            name="arrow-up-outline"
            type="ionicon"
            size={25}
            color={constants.styleConstants.black}
          />
          <Icon
            name="arrow-down-outline"
            type="ionicon"
            size={25}
            color={constants.styleConstants.black}
          />
          {/* <Icon
            name="like"
            type="evilicon"
            size={constants.styleConstants.iconSize}
            color={constants.styleConstants.black}
          /> */}
          <Icon
            name="comment"
            type="evilicon"
            size={constants.styleConstants.iconSize}
            color={constants.styleConstants.black}
          />
          <Icon
            name="exclamation"
            type="evilicon"
            size={constants.styleConstants.iconSize}
            // color={constants.styleConstants.black}
            color="red"
          />
        </View>
      </View>
    );
  }
}
export default function (props) {
  const navigation = useNavigation();
  return <Post {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    backgroundColor: constants.styleConstants.postBackgroundColor,
    borderBottomWidth: constants.styleConstants.betweenPostsWidth,
    borderBottomColor: constants.styleConstants.grey,
    paddingTop: 5,
  },
  postContainer: {
    justifyContent: "center",
    padding: 10,
  },
  titleText: {
    fontWeight: "bold",
  },
  userBar: {
    height: constants.styleConstants.rowHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  userPhotoName: {
    flexDirection: "row",
  },
  userPhoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  userNameContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    marginLeft: 10,
  },
  iconBar: {
    height: (constants.styleConstants.rowHeight * 4) / 5,
    padding: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
