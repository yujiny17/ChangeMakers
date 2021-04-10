import React from "react";
import Storage from "@aws-amplify/storage";
import { API, graphqlOperation } from "aws-amplify";
import {
  createPost,
  createPhoto,
  createPersonalTimeline,
  createTopic,
  createTopicTimeline,
} from "../graphql/mutations";
import { listFollowRelationships } from "../graphql/queries";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "../UserCredentials";

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
  let photo = { id: key, postId: postId };
  return await API.graphql(graphqlOperation(createPhoto, { input: photo }));
}

// request creation for all topics, if already exists it will
// throw an error but continue anyway.
async function createTopics(topics) {
  topics.forEach(async (topic) => {
    try {
      let resp = await API.graphql(
        graphqlOperation(createTopic, { input: { topic: topic } })
      );
      console.log("resp", resp);
    } catch (error) {
      console.log("possible error creating topic");
    }
  });
  return;
}

async function getFollowers(username) {
  let followersList = [];
  try {
    let resp = await API.graphql(
      graphqlOperation(listFollowRelationships, { followeeId: username })
    );
    console.log("resp", resp);
    let possFollowers = resp.data.listFollowRelationships.items;

    // only use relationships where follow field = true
    possFollowers.forEach((rel) => {
      // console.log("checking rel", rel);
      if (rel.following) {
        followersList.push(rel);
      }
    });
    console.log("Followers of", username, "are:", followersList);
    return followersList;
  } catch (error) {
    console.log("Error retrieving followers of", username, error);
    return [];
  }
}

async function addPostToFollowersTimeline(post) {
  try {
    // get list of current user's followers
    let user = await getToken();
    let followRelationshipsList = await getFollowers(user.username);

    // add post author to list of followers so post is displayed on author's timeline
    followRelationshipsList.push({ followerId: user.username });

    // add post to each follower's timeline
    await Promise.all(
      followRelationshipsList.map(async (relationship) => {
        const followerId = relationship.followerId;
        console.log("adding post to user", followerId);
        const timelineAddition = { username: followerId, postId: post.id };
        await API.graphql(
          graphqlOperation(createPersonalTimeline, { input: timelineAddition })
        );
      })
    );
  } catch (err) {
    console.log("ERROR in adding post to followers' timelines:", err);
    return;
  }
}

async function addPostToTopicsTimeline(post, topics) {
  try {
    // add post to each topic's timeline
    await Promise.all(
      topics.map(async (topic) => {
        console.log("adding post to topic", topic);
        const timelineAddition = { topic: topic, postId: post.id };
        let resp = await API.graphql(
          graphqlOperation(createTopicTimeline, { input: timelineAddition })
        );
        // console.log(resp);
      })
    );
  } catch (err) {
    console.log("ERROR in adding post to topic's timeline:", err);
    return;
  }
}

async function post(formState, photos, topics) {
  // console.log("formState:", formState);
  // console.log("photos:", photos);
  // console.log("topics:", topics);

  if (formState["title"] == "") {
    alert("Title is required.");
    return;
  }

  let post;
  try {
    const id = uuidv4();
    let userToken = await getToken();
    const username = userToken.username;

    let photoArray = [];
    // upload photos to S3 and DDB
    if (photos.length > 0) {
      let p = await Promise.all(photos.map((photo) => uploadPhotoS3(photo)));
      console.log("returned photo", p);
      let resp = await Promise.all(
        p.map((photo) => uploadPhotoDDB(photo.key, id))
      );
      resp.map((promise) => photoArray.push(promise.data.createPhoto.id));
    }

    // create topic in DDB
    createTopics(topics);

    // create post in DDB
    post = {
      id: id,
      username: username,
      photos: photoArray,
      upvote: 0,
      downvote: 0,
      misinformation: 0,
      totalvote: 0,
      topics: topics,
      type: "post",
      ...formState,
    };

    console.log("Creating post", post);
    await API.graphql(graphqlOperation(createPost, { input: post }));

    // add post to followers' timelines
    addPostToFollowersTimeline(post);

    // add post to each of the topic's timelines
    addPostToTopicsTimeline(post, topics);
  } catch (err) {
    console.log("ERROR in Create Post:", err);
  }
}

export { uploadPhotoS3, uploadPhotoDDB, post };
