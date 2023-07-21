import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { getPostById, getPosts } from '../actions/postActions.js';
import { PostType } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';

export const postQueries = {
  post: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: string, { id }, context: FastifyInstance) => {
      return getPostById(id, context);
    },
  },
  posts: {
    type: new GraphQLList(PostType),
    resolve: (_source: string, _args: unknown, context: FastifyInstance) => {
      return getPosts(context);
    },
  },
};
