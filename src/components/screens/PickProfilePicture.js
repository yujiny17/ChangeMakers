import React from "react";
import {
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import constants from "../../constants/constants";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../context/AuthContext";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../../graphql/mutations";

import { uploadPhotoS3, uploadPhotoDDB } from "../../actions/Photos";
import { setUserToken, storeProfilePicture } from "../../UserCredentials";

class PickProfilePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   username: props.route.params.username,
      //   password: props.route.params.password,
      filepath: null,
      error: "",
    };
  }

  async _processProfileImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          resize: {
            height: 320 / PixelRatio.get(),
            width: 320 / PixelRatio.get(),
          },
        },
      ],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  }

  async _openImagePicker() {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("pickerresult", pickerResult);

    let profilePhoto;
    if (!pickerResult.cancelled) {
      let p = await this._processProfileImageAsync(pickerResult.uri);
      profilePhoto = { uri: p.uri, name: p.filename, type: "image/jpg" };
      console.log("resized picker result to", profilePhoto);
      this.state.filepath = profilePhoto.uri;
      // store photo in S3 and DDB (photos and user)
      let s3Photo = await uploadPhotoS3(profilePhoto);
      console.log("promiseS3", s3Photo);
      let photoId = s3Photo.key;
      let ddbPhoto = await uploadPhotoDDB(photoId);
      console.log("promiseDDB", ddbPhoto);

      //   profilePhoto = ddbPhoto.data.createPhoto;

      let userId = this.props.route.params.username;
      //   let userId = "testUser";
      let input = { username: userId, photo: photoId };
      let user = await API.graphql(
        graphqlOperation(updateUser, { input: input })
      );
      console.log("updated user", user);
      setUserToken(userId);
      storeProfilePicture(photoId);

      // set user token to finalize log in
      this.context.setUserToken(userId);
    }

    return;
  }

  _continue() {
    let userId = this.props.route.params.username;
    this.context.setUserToken(userId);
    return;
  }

  render() {
    // console.log("pick profile for", this.props.route.params.username);
    return (
      <AuthContext.Consumer>
        {() => (
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.titleText}>Pick Profile Picture </Text>
              <TouchableOpacity
                style={styles.continueBtn}
                activeOpacity={0.5}
                onPress={() => this._openImagePicker()}
              >
                <Text style={styles.continueText}>Choose Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.continueBtn}
                activeOpacity={0.5}
                onPress={() => this._continue()}
              >
                <Text style={styles.continueText}>Pick Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
}

PickProfilePicture.contextType = AuthContext; // to access context through this.context

const styles = StyleSheet.create({
  container: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    // justifyContent: "center",
  },
  contentContainer: {
    height: 70 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    width: "80%",
    fontSize: 35,
    margin: 5,
  },
  inputContainer: {
    height: 42,
    width: "80%",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    padding: 8,
    margin: 5,
    color: constants.styleConstants.black,
  },
  continueBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: constants.styleConstants.orange,
  },
  continueText: {
    fontSize: 20,
    color: constants.styleConstants.offWhite,
  },
});

export default PickProfilePicture;
