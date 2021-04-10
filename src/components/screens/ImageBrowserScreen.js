import React, { Component } from "react";
import {
  PixelRatio,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { ImageBrowser } from "expo-image-picker-multiple";
import constants from "../../constants/constants";

export default class ImageBrowserScreen extends Component {
  headerLoader = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="small"
        color={"#0580FF"}
        style={styles.loadingIndicator}
      />
    </View>
  );

  imagesCallback = (callback) => {
    const { navigation } = this.props;
    this.props.navigation.setOptions({
      headerRight: () => this.headerLoader(),
    });

    callback
      .then(async (photos) => {
        const photoSelection = [];
        for (let photo of photos) {
          const pPhoto = await this._processImageAsync(photo.uri);
          photoSelection.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: "image/jpg",
          });
        }
        // console.log("returning photos", photoSelection);
        navigation.navigate("CreatePostForm", { photos: photoSelection });
      })
      .catch((e) => console.log(e));
  };

  async _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          resize: {
            height: 1080 / PixelRatio.get(),
            width: 1080 / PixelRatio.get(),
          },
        },
      ],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  }

  doneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity
        title={"Done"}
        onPress={onSubmit}
        style={styles.doneButton}
      >
        <Text onPress={onSubmit} style={styles.doneButtonText}>
          Done
        </Text>
      </TouchableOpacity>
    );
  };

  updateHandler = (count, onSubmit) => {
    this.props.navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => this.doneButton(count, onSubmit),
    });
  };

  renderSelectedComponent = (num) => (
    <View style={styles.count}>
      <Text style={styles.countText}>{num}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = (
      <Text style={styles.emptyText}>Nothing to Display</Text>
    );

    return (
      <View style={{ flex: 1, position: "relative}" }}>
        <ImageBrowser
          max={10}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
  },
  count: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "#007AFB",
    borderRadius: 0,
  },
  countText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "black",
  },
  doneButton: {
    color: constants.styleConstants.offWhite,
    paddingHorizontal: 10,
  },
  doneButtonText: {
    fontSize: 15,
    alignSelf: "center",
  },
  loadingIndicator: {
    paddingHorizontal: 10,
  },
});
