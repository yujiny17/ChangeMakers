import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { S3Image } from "aws-amplify-react-native";

import constants from "../../constants/constants";

// const UserPhoto = (props) => {
//   const user = props.user;
//   console.log(user);
//   if (user.photo != null) {
//     return <S3Image imgKey={user.photo} style={styles.userPhoto} />;
//   }
//   return (
//     // <Image
//     //   style={styles.defaultUserPhoto}
//     //   source={require("../../../assets/account-circle.png")}
//     // /
//     <Icon
//       name="account-circle"
//       type="material-community"
//       color="grey"
//       size={50}
//     />
//   );
// };

const UserResult = (props) => {
  const navigation = useNavigation();
  const user = props.user;
  let userPhotoExists = false;
  if (user.photo != null) userPhotoExists = true;
  // console.log("user photo", user.photo);
  return (
    <TouchableOpacity
      style={styles.userBar}
      onPress={() => navigation.push("ProfileScreen", { user: user })}
      activeOpacity={0.8}
    >
      <View style={styles.userPhotoName}>
        <View style={styles.userPhotoName2}>
          <View style={styles.userPhotoContainer}>
            {userPhotoExists ? (
              <S3Image imgKey={user.photo} style={styles.userPhoto} />
            ) : (
              <Icon
                name="account-circle"
                type="material-community"
                color="grey"
                size={50}
              />
            )}
          </View>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{user.username}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserResult;

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    backgroundColor: constants.styleConstants.postBackgroundColor,
    borderBottomWidth: constants.styleConstants.betweenPostsWidth,
    borderBottomColor: constants.styleConstants.grey,
    paddingTop: 5,
  },
  userBar: {
    height: constants.styleConstants.rowHeight * 1.1,
    width: 100 + "%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  userPhotoName: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 5,
  },
  userPhotoName2: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  userPhotoContainer: {
    height: 50,
    width: 50,
  },
  userPhoto: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userNameContainer: {
    height: 100 + "%",
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 20,
  },
});
