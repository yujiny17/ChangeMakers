import React from "react";
import Storage from "@aws-amplify/storage";
import { API, graphqlOperation } from "aws-amplify";
import { createPhoto } from "../graphql/mutations";
import { v4 as uuidv4 } from "uuid";

async function uploadPhotoS3(photo) {
  const photoId = uuidv4();
  try {
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    return await Storage.put(photoId, blob, {
      contentType: "image/jpeg",
    });
  } catch (error) {
    console.log("Error uploading file", error);
  }
}

async function uploadPhotoDDB(key, postId) {
  let photo = { id: key };
  return await API.graphql(graphqlOperation(createPhoto, { input: photo }));
}

export { uploadPhotoS3, uploadPhotoDDB };
