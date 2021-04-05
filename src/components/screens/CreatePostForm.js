import React, { useState, getState } from "react";
import Storage from "@aws-amplify/storage";
import { Auth } from "aws-amplify";

import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { post } from "../../actions/CreatePost";

import { PostButton, CloseButton } from "../CreatePost/CreatePostHeader";
import UserBar from "../Post/UserBar";
import constants from "../../constants/constants.js";
import baseStyles from "../../constants/styles";

const initialState = { title: "", text: "" };
export default CreatePostForm = (props) => {
  const navigation = useNavigation();
  const [formState, setFormState] = useState(initialState);

  // variables to pass to post()
  const photos = props.route.params.photos;

  //   const videos
  // const links

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackImage: () => <CloseButton />,
      headerRight: () => <PostButton onPress={() => post(formState, photos)} />,
    });
  });

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  return (
    <View style={baseStyles.mainContainerStyle}>
      <View style={styles.inputContainer}>
        <UserBar onPress={() => {}} />
        <TextInput
          placeholder={"Post Title"}
          style={styles.titleInputContainer}
          placeholderTextColor={"#808080"}
          backgroundColor={constants.styleConstants.white}
          onChangeText={(input) => setInput("title", input)}
          spellCheck={false}
          autoCapitalize={"none"}
          autoCompleteType={"off"}
          multiline={true}
          maxLength={10000}
        />
        <TextInput
          placeholder={"What do you want to say?"}
          style={styles.textInputContainer}
          placeholderTextColor="#808080"
          backgroundColor={constants.styleConstants.white}
          onChangeText={(input) => setInput("text", input)}
          spellCheck={false}
          autoCapitalize={"none"}
          autoCompleteType={"off"}
          multiline={true}
          textAlignVertical={"top"}
          maxLength={50000}
          numberOfLines={3}
        />
      </View>
      {DisplayPhotos(photos)}
      <View style={styles.shadowBorder}>
        <View style={styles.postAdditionsContainer}>
          <Button
            buttonStyle={{
              backgroundColor: constants.styleConstants.white,
            }}
            onPress={() => {
              navigation.navigate("ImageBrowserScreen");
            }}
            icon={
              <Icon
                name="image-outline"
                type="ionicon"
                color="green"
                // style={styles.icon}
                // containerStyle={styles.iconContainer}
                size={30}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

const DisplayPhotos = (photos) => {
  console.log(photos);
  if (photos.length <= 0) return;
  return (
    <ScrollView
      style={styles.displayPhotos}
      contentContainerStyle={styles.photoContainer}
    >
      <View style={styles.viewContainer}>
        {photos.map((item, i) => (
          <Image
            style={{
              height: constants.styleConstants.selectedImageHeight,
              width: constants.styleConstants.selectedImageWidth,
            }}
            source={{ uri: item.uri }}
            key={i}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  inputContainer: {
    marginBottom: 5,
  },
  titleInputContainer: {
    width: 100 + "%",
    fontWeight: "bold",
    color: constants.styleConstants.black,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 20,
  },
  textInputContainer: {
    width: 100 + "%",
    color: constants.styleConstants.black,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 20,
  },
  shadowBorder: {
    width: "100%",
    backgroundColor: "transparent",
    shadowColor: constants.styleConstants.black,
    shadowOffset: {
      // width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  postAdditionsContainer: {
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: constants.styleConstants.white,
    flexDirection: "row",
    justifyContent: "center",
  },
  displayPhotos: {
    height: constants.styleConstants.selectedImageHeight * 2,
    width: "100%",
    paddingHorizontal: 10,
    flexGrow: 0,
    flexShrink: 1,
  },
  viewContainer: {
    alignContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
});
