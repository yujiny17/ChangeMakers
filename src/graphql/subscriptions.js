/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto {
    onCreatePhoto {
      id
      postId
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto {
    onUpdatePhoto {
      id
      postId
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto {
    onDeletePhoto {
      id
      postId
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      email
      photo
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      email
      photo
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      email
      photo
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserPostActivity = /* GraphQL */ `
  subscription OnCreateUserPostActivity {
    onCreateUserPostActivity {
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
export const onUpdateUserPostActivity = /* GraphQL */ `
  subscription OnUpdateUserPostActivity {
    onUpdateUserPostActivity {
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
export const onDeleteUserPostActivity = /* GraphQL */ `
  subscription OnDeleteUserPostActivity {
    onDeleteUserPostActivity {
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
export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic {
    onCreateTopic {
      id
      topic
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTopic = /* GraphQL */ `
  subscription OnUpdateTopic {
    onUpdateTopic {
      id
      topic
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTopic = /* GraphQL */ `
  subscription OnDeleteTopic {
    onDeleteTopic {
      id
      topic
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateFollowRelationship = /* GraphQL */ `
  subscription OnCreateFollowRelationship {
    onCreateFollowRelationship {
      followeeId
      followerId
      following
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFollowRelationship = /* GraphQL */ `
  subscription OnUpdateFollowRelationship {
    onUpdateFollowRelationship {
      followeeId
      followerId
      following
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFollowRelationship = /* GraphQL */ `
  subscription OnDeleteFollowRelationship {
    onDeleteFollowRelationship {
      followeeId
      followerId
      following
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTopicFollowRelationship = /* GraphQL */ `
  subscription OnCreateTopicFollowRelationship {
    onCreateTopicFollowRelationship {
      id
      followerId
      topic
      following
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTopicFollowRelationship = /* GraphQL */ `
  subscription OnUpdateTopicFollowRelationship {
    onUpdateTopicFollowRelationship {
      id
      followerId
      topic
      following
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTopicFollowRelationship = /* GraphQL */ `
  subscription OnDeleteTopicFollowRelationship {
    onDeleteTopicFollowRelationship {
      id
      followerId
      topic
      following
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePersonalTimeline = /* GraphQL */ `
  subscription OnCreatePersonalTimeline {
    onCreatePersonalTimeline {
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
export const onUpdatePersonalTimeline = /* GraphQL */ `
  subscription OnUpdatePersonalTimeline {
    onUpdatePersonalTimeline {
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
export const onDeletePersonalTimeline = /* GraphQL */ `
  subscription OnDeletePersonalTimeline {
    onDeletePersonalTimeline {
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
export const onCreateTopicTimeline = /* GraphQL */ `
  subscription OnCreateTopicTimeline {
    onCreateTopicTimeline {
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
export const onUpdateTopicTimeline = /* GraphQL */ `
  subscription OnUpdateTopicTimeline {
    onUpdateTopicTimeline {
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
export const onDeleteTopicTimeline = /* GraphQL */ `
  subscription OnDeleteTopicTimeline {
    onDeleteTopicTimeline {
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
