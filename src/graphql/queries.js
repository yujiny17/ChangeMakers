/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPhoto = /* GraphQL */ `
  query GetPhoto($id: ID!) {
    getPhoto(id: $id) {
      id
      postId
      type
      createdAt
      updatedAt
    }
  }
`;
export const listPhotos = /* GraphQL */ `
  query ListPhotos(
    $filter: ModelPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      username
      email
      photo
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $username: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        username
        email
        photo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserPostActivity = /* GraphQL */ `
  query GetUserPostActivity($username: String!, $postId: ID!) {
    getUserPostActivity(username: $username, postId: $postId) {
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
export const listUserPostActivitys = /* GraphQL */ `
  query ListUserPostActivitys(
    $username: String
    $postId: ModelIDKeyConditionInput
    $filter: ModelUserPostActivityFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserPostActivitys(
      username: $username
      postId: $postId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        postId
        upvote
        downvote
        misinformation
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTopic = /* GraphQL */ `
  query GetTopic($topic: String!) {
    getTopic(topic: $topic) {
      id
      topic
      createdAt
      updatedAt
    }
  }
`;
export const listTopics = /* GraphQL */ `
  query ListTopics(
    $topic: String
    $filter: ModelTopicFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTopics(
      topic: $topic
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        topic
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPostsBySpecificOwner = /* GraphQL */ `
  query ListPostsBySpecificOwner(
    $username: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsBySpecificOwner(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPostsByPopularity = /* GraphQL */ `
  query ListPostsByPopularity(
    $type: String
    $totalvote: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsByPopularity(
      type: $type
      totalvote: $totalvote
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postId
      createdAt
      username
      text
      updatedAt
      user
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        createdAt
        username
        text
        updatedAt
        user
      }
      nextToken
    }
  }
`;
export const listCommentsbyPost = /* GraphQL */ `
  query ListCommentsbyPost(
    $postId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentsbyPost(
      postId: $postId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        createdAt
        username
        text
        updatedAt
        user
      }
      nextToken
    }
  }
`;
export const getFollowRelationship = /* GraphQL */ `
  query GetFollowRelationship($followeeId: ID!, $followerId: ID!) {
    getFollowRelationship(followeeId: $followeeId, followerId: $followerId) {
      followeeId
      followerId
      following
      createdAt
      updatedAt
    }
  }
`;
export const listFollowRelationships = /* GraphQL */ `
  query ListFollowRelationships(
    $followeeId: ID
    $followerId: ModelIDKeyConditionInput
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFollowRelationships(
      followeeId: $followeeId
      followerId: $followerId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        followeeId
        followerId
        following
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listFollowRelationshipsbyFollower = /* GraphQL */ `
  query ListFollowRelationshipsbyFollower(
    $followerId: ID
    $followeeId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowRelationshipsbyFollower(
      followerId: $followerId
      followeeId: $followeeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        followeeId
        followerId
        following
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTopicFollowRelationship = /* GraphQL */ `
  query GetTopicFollowRelationship($followerId: ID!, $topic: ID!) {
    getTopicFollowRelationship(followerId: $followerId, topic: $topic) {
      followerId
      topic
      following
      createdAt
      updatedAt
    }
  }
`;
export const listTopicFollowRelationships = /* GraphQL */ `
  query ListTopicFollowRelationships(
    $followerId: ID
    $topic: ModelIDKeyConditionInput
    $filter: ModelTopicFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTopicFollowRelationships(
      followerId: $followerId
      topic: $topic
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        followerId
        topic
        following
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPersonalTimeline = /* GraphQL */ `
  query GetPersonalTimeline($id: ID!) {
    getPersonalTimeline(id: $id) {
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
export const listPersonalTimelines = /* GraphQL */ `
  query ListPersonalTimelines(
    $filter: ModelPersonalTimelineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalTimelines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPersonalTimelinesByOwner = /* GraphQL */ `
  query ListPersonalTimelinesByOwner(
    $username: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPersonalTimelineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalTimelinesByOwner(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTopicTimeline = /* GraphQL */ `
  query GetTopicTimeline($id: ID!) {
    getTopicTimeline(id: $id) {
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
export const listTopicTimelines = /* GraphQL */ `
  query ListTopicTimelines(
    $filter: ModelTopicTimelineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopicTimelines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const listTopicTimelinesByTopic = /* GraphQL */ `
  query ListTopicTimelinesByTopic(
    $topic: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTopicTimelineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopicTimelinesByTopic(
      topic: $topic
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
