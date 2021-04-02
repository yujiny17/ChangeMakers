/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto(
    $input: CreatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    createPhoto(input: $input, condition: $condition) {
      id
      postId
      type
      createdAt
      updatedAt
    }
  }
`;
export const updatePhoto = /* GraphQL */ `
  mutation UpdatePhoto(
    $input: UpdatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    updatePhoto(input: $input, condition: $condition) {
      id
      postId
      type
      createdAt
      updatedAt
    }
  }
`;
export const deletePhoto = /* GraphQL */ `
  mutation DeletePhoto(
    $input: DeletePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    deletePhoto(input: $input, condition: $condition) {
      id
      postId
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateFollowRelationship = /* GraphQL */ `
  mutation UpdateFollowRelationship(
    $input: UpdateFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    updateFollowRelationship(input: $input, condition: $condition) {
      followeeId
      followerId
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      username
      email
      photo
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      username
      email
      photo
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      username
      email
      photo
      createdAt
      updatedAt
    }
  }
`;
export const createUserPostActivity = /* GraphQL */ `
  mutation CreateUserPostActivity(
    $input: CreateUserPostActivityInput!
    $condition: ModelUserPostActivityConditionInput
  ) {
    createUserPostActivity(input: $input, condition: $condition) {
      username
      postId
      upvote
      downvote
      misinformation
      createdAt
      updatedAt
    }
  }
`;
export const updateUserPostActivity = /* GraphQL */ `
  mutation UpdateUserPostActivity(
    $input: UpdateUserPostActivityInput!
    $condition: ModelUserPostActivityConditionInput
  ) {
    updateUserPostActivity(input: $input, condition: $condition) {
      username
      postId
      upvote
      downvote
      misinformation
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserPostActivity = /* GraphQL */ `
  mutation DeleteUserPostActivity(
    $input: DeleteUserPostActivityInput!
    $condition: ModelUserPostActivityConditionInput
  ) {
    deleteUserPostActivity(input: $input, condition: $condition) {
      username
      postId
      upvote
      downvote
      misinformation
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      username
      title
      text
      photos
      upvote
      downvote
      totalvote
      misinformation
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      username
      title
      text
      photos
      upvote
      downvote
      totalvote
      misinformation
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      username
      title
      text
      photos
      upvote
      downvote
      totalvote
      misinformation
      createdAt
      updatedAt
    }
  }
`;
export const createFollowRelationship = /* GraphQL */ `
  mutation CreateFollowRelationship(
    $input: CreateFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    createFollowRelationship(input: $input, condition: $condition) {
      followeeId
      followerId
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollowRelationship = /* GraphQL */ `
  mutation DeleteFollowRelationship(
    $input: DeleteFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    deleteFollowRelationship(input: $input, condition: $condition) {
      followeeId
      followerId
      createdAt
      updatedAt
    }
  }
`;
export const createPersonalTimeline = /* GraphQL */ `
  mutation CreatePersonalTimeline(
    $input: CreatePersonalTimelineInput!
    $condition: ModelPersonalTimelineConditionInput
  ) {
    createPersonalTimeline(input: $input, condition: $condition) {
      id
      username
      postId
      createdAt
      updatedAt
      post {
        id
        username
        title
        text
        photos
        upvote
        downvote
        totalvote
        misinformation
        createdAt
        updatedAt
      }
    }
  }
`;
export const updatePersonalTimeline = /* GraphQL */ `
  mutation UpdatePersonalTimeline(
    $input: UpdatePersonalTimelineInput!
    $condition: ModelPersonalTimelineConditionInput
  ) {
    updatePersonalTimeline(input: $input, condition: $condition) {
      id
      username
      postId
      createdAt
      updatedAt
      post {
        id
        username
        title
        text
        photos
        upvote
        downvote
        totalvote
        misinformation
        createdAt
        updatedAt
      }
    }
  }
`;
export const deletePersonalTimeline = /* GraphQL */ `
  mutation DeletePersonalTimeline(
    $input: DeletePersonalTimelineInput!
    $condition: ModelPersonalTimelineConditionInput
  ) {
    deletePersonalTimeline(input: $input, condition: $condition) {
      id
      username
      postId
      createdAt
      updatedAt
      post {
        id
        username
        title
        text
        photos
        upvote
        downvote
        totalvote
        misinformation
        createdAt
        updatedAt
      }
    }
  }
`;
export const addCreatedPostToFollowersTimeline = /* GraphQL */ `
  mutation AddCreatedPostToFollowersTimeline($postId: ID!) {
    addCreatedPostToFollowersTimeline(postId: $postId) {
      id
      username
      title
      text
      photos
      upvote
      downvote
      totalvote
      misinformation
      createdAt
      updatedAt
    }
  }
`;
