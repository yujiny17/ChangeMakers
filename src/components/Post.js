import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import constants from "../constants/constants.js";

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
  render() {
    const imageHeight = Math.floor(this.state.screenWidth * 1.1);
    const imageUri =
      "https://media-exp1.licdn.com/dms/image/C4E03AQFoTpoq2QHAVA/profile-displayphoto-shrink_100_100/0/1588884556380?e=1620864000&v=beta&t=oaJ-DWkzGysRlkZDynxup5BK8qFpn-uEVmyQ1Tuu5qM";
    return (
      <View style={styles.container}>
        <View style={styles.userBar}>
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
        </View>
        {/* Use UUIDs!!!! */}
        <View key={this.props.post.id + "View"} style={styles.postContainer}>
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
        </View>
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
export default Post;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: constants.styleConstants.betweenPostsWidth,
    borderBottomColor: constants.styleConstants.grey,
  },
  postContainer: {
    backgroundColor: "#FCFCFC",
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
