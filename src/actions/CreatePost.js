import React from "react";
import Storage from "@aws-amplify/storage";
import { API, graphqlOperation } from "aws-amplify";
import {
  createPost,
  createPhoto,
  createPersonalTimeline,
  //   createFollowRelationship,
} from "../graphql/mutations";
import { listFollowRelationships } from "../graphql/queries";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "../UserCredentials";

async function uploadPhotoS3(photo) {
  const photoId = uuidv4();
  return await Storage.put(photoId, { ...photo });
}

async function uploadPhotoDDB(key, postId) {
  let photo = { id: key, postId: postId };
  return await API.graphql(graphqlOperation(createPhoto, { input: photo }));
}

async function getFollowers(username) {
  let followersList = [];
  try {
    // let allFollowRelationships = await API.graphql(
    //   graphqlOperation(listFollowRelationships)
    // );
    // console.log(allFollowRelationships);

    // I think it's working but need to create followerelationships properly not through DDB UI
    let resp = await API.graphql(
      graphqlOperation(listFollowRelationships, { followeeId: username })
    );
    console.log("resp", resp);
    followersList = resp.data.listFollowRelationships.items;
    console.log("Followers of", username, "are:", followersList);
    return followersList;
  } catch (error) {
    console.log("Error retrieving followers of", username, error);
    return [];
  }
}

async function addPostToFollowersTimeline(post) {
  try {
    // for testing purposes add follower relationships to "testUser"
    // await API.graphql(
    //   graphqlOperation(createFollowRelationship, {
    //     input: {
    //       followeeId: "testUser",
    //       followerId: "jester",
    //     },
    //   })
    // );

    // get list of current user's followers
    let user = await getToken();
    let followRelationshipsList = await getFollowers(user.username);

    // add post author to list of followers so post is displayed on author's timeline
    followRelationshipsList.push({ followerId: "testUser" });

    // add post to each follower's timeline
    await Promise.all(
      followRelationshipsList.map(async (relationship) => {
        const followerId = relationship.followerId;
        console.log("adding post with id", post.id, "to user", followerId);
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

  // Get List of Followers
  //   await API.graphql(
  //     graphqlOperation(addCreatedPostToFollowersTimeline, {
  //       postId: test,
  //     })

  // publish posts to followers' timelines
}

async function post(formState, photos) {
  // console.log("formState:", formState);
  // console.log("photos:", photos);

  // TESTING: publish post to followers' timelines
  //   addPostToFollowersTimeline({
  //     ...formState,
  //     id: "testId",
  //     username: "testUser",
  //   });
  //   return;

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
      let resp = await Promise.all(
        p.map((photo) => uploadPhotoDDB(photo.key, id))
      );
      resp.map((promise) => photoArray.push(promise.data.createPhoto.id));
    }
    // create post in DDB
    post = {
      id: id,
      username: username,
      photos: photoArray,
      upvote: 0,
      downvote: 0,
      misinformation: 0,
      ...formState,
    };
    console.log("Creating post with id:", post.id);
    console.log("Creating post", post);
    await API.graphql(graphqlOperation(createPost, { input: post }));
    addPostToFollowersTimeline(post);
  } catch (err) {
    console.log("ERROR in Create Post:", err);
  }
}

export { uploadPhotoS3, uploadPhotoDDB, post };
