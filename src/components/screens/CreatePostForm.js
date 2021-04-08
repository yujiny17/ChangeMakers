import React, { useState, getState } from "react";
import Storage from "@aws-amplify/storage";
import { Auth } from "aws-amplify";

import {
  Dimensions,
  Keyboard,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { post } from "../../actions/CreatePost";

import { PostButton, CloseButton } from "../CreatePost/CreatePostHeader";
import UserBar from "../Post/UserBar";
import constants from "../../constants/constants.js";
import { TouchableHighlight } from "react-native-gesture-handler";

const initialState = { title: "", text: "" };

class CreatePostForm extends React.Component {
  // export default CreatePostForm = (props) => {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        title: "",
        text: "",
      },
      inputHeight: 50,
      photos: [],
      topics: [],
    };
  }

  // const navigation = useNavigation();
  // const [formState, setFormState] = useState(initialState);
  // const [inputHeight, setInputHeight] = useState(0);
  // variables to pass to post()

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.setState({ photos: this.props.route.params.photos });
    });
    this.props.navigation.setOptions({
      headerBackImage: () => <CloseButton />,
      headerRight: () => (
        <PostButton
          onPress={() => {
            post(this.state.formState, this.state.photos, this.state.topics);
            this.props.navigation.pop();
          }}
        />
      ),
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  // const photos = props.route.params.photos;

  //   const videos
  // const links

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerBackImage: () => <CloseButton />,
  //     headerRight: () => <PostButton onPress={() => post(formState, photos)} />,
  //   });
  // });

  setInput(key, value) {
    this.setState({ formState: { ...this.state.formState, [key]: value } });
  }
  // setInput(key, value) {
  //   setFormState({ ...formState, [key]: value });
  // }

  updateSize(height) {
    this.setState({ inputHeight: height });
  }
  // updateSize(height) {
  //   setInputHeight(height);
  // }

  _addTopic() {
    let topics = this.state.topics;
    topics.push("");
    this.setState({ topics: topics });
  }

  _setTopic(input, i) {
    console.log("setting topic", i, "to", input);
    let topics = this.state.topics;
    topics[i] = input;
    topics.edited = true;
    this.setState({ topics: topics });
  }

  DisplayTopics = (topics) => {
    if (topics == null || topics?.length <= 0) return;
    console.log("topics:", topics);
    return (
      <View style={styles.displayTopics}>
        {topics.map((topic, i) => (
          <View style={styles.topicInputContainer} key={i}>
            <TextInput
              placeholder={"topic"}
              style={styles.topicTextInputContainer}
              placeholderTextColor={"#808080"}
              onChangeText={(input) => this._setTopic(input, i)}
              spellCheck={false}
              autoCapitalize={"none"}
              autoCompleteType={"off"}
              multiline={false}
              maxLength={10000}
              key={i}
              value={topics[i]}
            />
            <Icon
              name="close-outline"
              type="ionicon"
              color="black"
              size={20}
              onPress={() => {
                this.state.topics.splice(i, 1);
                this.setState({ topics: this.state.topics });
              }}
            />
          </View>
        ))}
      </View>
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.mainContainerStyle}
        activeOpacity={1.0}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.inputContainer}>
          <UserBar onPress={() => {}} />
          <TextInput
            placeholder={"Post Title"}
            style={styles.titleInputContainer}
            placeholderTextColor={"#808080"}
            backgroundColor={constants.styleConstants.white}
            onChangeText={(input) => this.setInput("title", input)}
            spellCheck={false}
            autoCapitalize={"none"}
            autoCompleteType={"off"}
            multiline={true}
            maxLength={10000}
          />
          <ScrollView
            style={{
              width: Dimensions.get("window").width,
            }}
            // bounces={false}
            contentContainerStyle={styles.mainInputContainer}
          >
            <TextInput
              placeholder={"What do you want to say?"}
              placeholderTextColor="#808080"
              // backgroundColor={constants.styleConstants.white}
              onChangeText={(input) => this.setInput("text", input)}
              spellCheck={false}
              autoCapitalize={"none"}
              autoCompleteType={"off"}
              multiline={true}
              textAlignVertical={"top"}
              maxLength={50000}
              scrollEnabled={false}
              // numberOfLines={1}
              onContentSizeChange={(e) =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
              style={{
                width: 100 + "%",
                color: constants.styleConstants.black,
                paddingHorizontal: 20,
                paddingVertical: 10,
                fontSize: 20,
                flexGrow: 1,
                height: Math.max(40, this.state.inputHeight),
              }}
            />
            {DisplayPhotos(this.state.photos)}
            {this.DisplayTopics(this.state.topics)}
          </ScrollView>
        </View>
        <View style={styles.shadowBorder}>
          <View style={styles.topPostAdditionsContainer}>
            <TouchableOpacity
              style={styles.imageBtn}
              activeOpacity={0.8}
              onPress={() => {
                this.props.navigation.navigate("ImageBrowserScreen");
              }}
            >
              <Icon
                name="image-outline"
                type="ionicon"
                color="green"
                size={30}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.postAdditionsContainer}
            onPress={() => this._addTopic()}
          >
            <Text
              style={{
                fontSize: 18,
                color: constants.styleConstants.orange,
                fontWeight: "bold",
              }}
            >
              Add Topic
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

const DisplayPhotos = (photos) => {
  if (photos == null || photos?.length <= 0) return;
  return (
    <View style={styles.displayPhotos}>
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
  );
};

export default function (props) {
  const navigation = useNavigation();
  return <CreatePostForm {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
    justifyContent: "flex-start",
  },
  inputContainer: {
    height: 50 + "%",
    width: 100 + "%",
    flexDirection: "column",
    justifyContent: "flex-start",
    // marginBottom: 5,
  },
  titleInputContainer: {
    width: 100 + "%",
    fontWeight: "bold",
    color: constants.styleConstants.black,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 25,
  },
  mainInputContainer: {
    // don't put 100% here or it will never be larger than scrollview and
    // therefore iwll never scroll
    width: 100 + "%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textInputContainer: {
    width: 100 + "%",
    color: constants.styleConstants.black,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 20,
    flexGrow: 1,
  },

  displayPhotos: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  displayTopics: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    margin: 10,
  },
  topicInputContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderColor: constants.styleConstants.orange,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topicTextInputContainer: {
    // width: 100,
    color: constants.styleConstants.black,
    paddingHorizontal: 5,

    fontSize: 18,
    // backgroundColor: constants.styleConstants.white,
  },
  viewContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    // alignContent:
    flexWrap: "wrap",
    flex: 1,
  },
  // addition buttons
  shadowBorder: {
    width: 100 + "%",
    backgroundColor: constants.styleConstants.white,
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
  topPostAdditionsContainer: {
    height: constants.styleConstants.rowHeight,
    width: 100 + "%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "grey",
  },
  imageBtn: {
    height: 100 + "%",
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: constants.styleConstants.white,
  },
  postAdditionsContainer: {
    height: constants.styleConstants.rowHeight,
    width: "100%",
    borderTopWidth: 2,
    borderColor: constants.styleConstants.grey,
    backgroundColor: constants.styleConstants.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
