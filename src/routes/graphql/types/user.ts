import { FastifyInstance } from 'fastify';
import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { getPostsByAuthorId } from '../actions/postActions.js';
import { getProfileByUserId } from '../actions/profileActions.js';
import { getSubscribersOfUser, getSubscriptionsOfUser } from '../actions/userActions.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UUIDType } from './uuid.js';

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
      resolve: ({ id }, _args: unknown, context: FastifyInstance) => {
        return getProfileByUserId(id, context);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: ({ id }, _args: unknown, context: FastifyInstance) => {
        return getPostsByAuthorId(id, context);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: ({ id }, _args: unknown, context: FastifyInstance) => {
        return getSubscribersOfUser(id, context);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: ({ id }, _args: unknown, context: FastifyInstance) => {
        return getSubscriptionsOfUser(id, context);
      },
    },
  }),
});
