import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { FastifyInstance } from 'fastify';

import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { getProfileById } from '../actions/profileActions.js';
import { PostType } from './post.js';
import { getPostsByAuthor } from '../actions/postActions.js';
import { getSubscribersOfUser, getSubscriptionsOfUser } from '../actions/userActions.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: ProfileType,
      resolve: (_source: string, { id }, context: FastifyInstance) =>
        getProfileById(id, context),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (_source: string, { id }, context: FastifyInstance) =>
        getPostsByAuthor(id, context),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: (_source: string, { id }, context: FastifyInstance) =>
        getSubscribersOfUser(id, context),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: (_source: string, { id }, context: FastifyInstance) =>
        getSubscriptionsOfUser(id, context),
    },
  }),
});
