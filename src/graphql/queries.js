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
        createdAt
        updatedAt
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
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
