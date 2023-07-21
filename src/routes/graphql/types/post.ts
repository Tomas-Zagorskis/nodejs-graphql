import { FastifyInstance } from 'fastify';
import { GraphQLObjectType, GraphQLString } from 'graphql';

import { getUserById } from '../actions/userActions.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    author: {
      type: UserType,
      resolve: ({ authorId }, _args: unknown, context: FastifyInstance) => {
        return getUserById(authorId, context);
      },
    },
    authorId: {
      type: UUIDType,
    },
  }),
});
