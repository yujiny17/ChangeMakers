/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto {
    onCreatePhoto {
      id
      postId
      type
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      username
      email
      photo
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      username
      email
      photo
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      username
      email
      photo
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      type
      id
      username
      title
      text
      photos
      createdAt
      upvote
      downVote
      misinformationScore
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      type
      id
      username
      title
      text
      photos
      createdAt
      upvote
      downVote
      misinformationScore
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      type
      id
      username
      title
      text
      photos
      createdAt
      upvote
      downVote
      misinformationScore
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const onCreateFollowRelationship = /* GraphQL */ `
  subscription OnCreateFollowRelationship {
    onCreateFollowRelationship {
      followeeId
      followerId
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      updatedAt
      post {
        type
        id
        username
        title
        text
        photos
        createdAt
        upvote
        downVote
        misinformationScore
        _version
        _deleted
        _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      updatedAt
      post {
        type
        id
        username
        title
        text
        photos
        createdAt
        upvote
        downVote
        misinformationScore
        _version
        _deleted
        _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      updatedAt
      post {
        type
        id
        username
        title
        text
        photos
        createdAt
        upvote
        downVote
        misinformationScore
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
    }
  }
`;
