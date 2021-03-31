import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import constants from "../../constants/constants";

const UserBar = (props) => {
  const imageUri =
    "https://media-exp1.licdn.com/dms/image/C4E03AQFoTpoq2QHAVA/profile-displayphoto-shrink_100_100/0/1588884556380?e=1620864000&v=beta&t=oaJ-DWkzGysRlkZDynxup5BK8qFpn-uEVmyQ1Tuu5qM";
  return (
    <TouchableOpacity
      style={styles.userBar}
      onPress={() => props.onPress()}
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
  );
};

export default UserBar;

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    backgroundColor: constants.styleConstants.postBackgroundColor,
    borderBottomWidth: constants.styleConstants.betweenPostsWidth,
    borderBottomColor: constants.styleConstants.grey,
    paddingTop: 5,
  },
  userBar: {
    height: constants.styleConstants.rowHeight,
    width: 100 + "%",
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
    fontWeight: "500",
  },
});
