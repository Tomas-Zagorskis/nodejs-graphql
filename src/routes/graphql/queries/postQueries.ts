import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/post.js';
import { getPostById, getPosts } from '../actions/postActions.js';

export const postQueries = {
  post: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id }, context: FastifyInstance) =>
      getPostById(id, context),
  },
  posts: {
    type: new GraphQLList(PostType),
    resolve: (_source: unknown, _args: unknown, context: FastifyInstance) =>
      getPosts(context),
  },
};
