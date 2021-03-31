import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Post {
  readonly id: string;
  readonly type: string;
  readonly username: string;
  readonly title?: string;
  readonly text?: string;
  readonly photos?: (string | null)[];
  readonly createdAt?: string;
  readonly upvote?: number;
  readonly downVote?: number;
  readonly misinformationScore?: number;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Photo {
  readonly id: string;
  readonly postId?: string;
  readonly type?: string;
  constructor(init: ModelInit<Photo>);
  static copyOf(source: Photo, mutator: (draft: MutableModel<Photo>) => MutableModel<Photo> | void): Photo;
}

export declare class FollowRelationship {
  readonly id: string;
  readonly followeeId: string;
  readonly followerId: string;
  constructor(init: ModelInit<FollowRelationship>);
  static copyOf(source: FollowRelationship, mutator: (draft: MutableModel<FollowRelationship>) => MutableModel<FollowRelationship> | void): FollowRelationship;
}

export declare class PersonalTimeline {
  readonly id: string;
  readonly username: string;
  readonly postId: string;
  readonly createdAt?: string;
  readonly post?: Post;
  constructor(init: ModelInit<PersonalTimeline>);
  static copyOf(source: PersonalTimeline, mutator: (draft: MutableModel<PersonalTimeline>) => MutableModel<PersonalTimeline> | void): PersonalTimeline;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly photo?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}