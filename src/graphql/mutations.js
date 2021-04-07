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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
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
      id
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
      id
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
export const createTopic = /* GraphQL */ `
  mutation CreateTopic(
    $input: CreateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    createTopic(input: $input, condition: $condition) {
      id
      topic
      createdAt
      updatedAt
    }
  }
`;
export const updateTopic = /* GraphQL */ `
  mutation UpdateTopic(
    $input: UpdateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    updateTopic(input: $input, condition: $condition) {
      id
      topic
      createdAt
      updatedAt
    }
  }
`;
export const deleteTopic = /* GraphQL */ `
  mutation DeleteTopic(
    $input: DeleteTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    deleteTopic(input: $input, condition: $condition) {
      id
      topic
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
      topics
      type
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
      topics
      type
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
      topics
      type
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
      following
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
      following
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
      following
      createdAt
      updatedAt
    }
  }
`;
export const createTopicFollowRelationship = /* GraphQL */ `
  mutation CreateTopicFollowRelationship(
    $input: CreateTopicFollowRelationshipInput!
    $condition: ModelTopicFollowRelationshipConditionInput
  ) {
    createTopicFollowRelationship(input: $input, condition: $condition) {
      followerId
      topic
      following
      createdAt
      updatedAt
    }
  }
`;
export const updateTopicFollowRelationship = /* GraphQL */ `
  mutation UpdateTopicFollowRelationship(
    $input: UpdateTopicFollowRelationshipInput!
    $condition: ModelTopicFollowRelationshipConditionInput
  ) {
    updateTopicFollowRelationship(input: $input, condition: $condition) {
      followerId
      topic
      following
      createdAt
      updatedAt
    }
  }
`;
export const deleteTopicFollowRelationship = /* GraphQL */ `
  mutation DeleteTopicFollowRelationship(
    $input: DeleteTopicFollowRelationshipInput!
    $condition: ModelTopicFollowRelationshipConditionInput
  ) {
    deleteTopicFollowRelationship(input: $input, condition: $condition) {
      followerId
      topic
      following
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
        topics
        type
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
        topics
        type
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
        topics
        type
        createdAt
        updatedAt
      }
    }
  }
`;
export const createTopicTimeline = /* GraphQL */ `
  mutation CreateTopicTimeline(
    $input: CreateTopicTimelineInput!
    $condition: ModelTopicTimelineConditionInput
  ) {
    createTopicTimeline(input: $input, condition: $condition) {
      id
      topic
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
        topics
        type
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateTopicTimeline = /* GraphQL */ `
  mutation UpdateTopicTimeline(
    $input: UpdateTopicTimelineInput!
    $condition: ModelTopicTimelineConditionInput
  ) {
    updateTopicTimeline(input: $input, condition: $condition) {
      id
      topic
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
        topics
        type
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteTopicTimeline = /* GraphQL */ `
  mutation DeleteTopicTimeline(
    $input: DeleteTopicTimelineInput!
    $condition: ModelTopicTimelineConditionInput
  ) {
    deleteTopicTimeline(input: $input, condition: $condition) {
      id
      topic
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
        topics
        type
        createdAt
        updatedAt
      }
    }
  }
`;
