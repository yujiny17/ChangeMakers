// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, Photo, FollowRelationship, PersonalTimeline, User, UserPostActivity } = initSchema(schema);

export {
  Post,
  Photo,
  FollowRelationship,
  PersonalTimeline,
  User,
  UserPostActivity
};