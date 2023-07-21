import { FastifyInstance } from 'fastify';

import { GraphQLBoolean } from 'graphql';
import { createPost, deletePost, updatePost } from '../actions/postActions.js';
import { PostChangeType, PostCreateType, PostType } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';

export const postMutations = {
  createPost: {
    type: PostType,
    args: {
      dto: {
        type: PostCreateType,
      },
    },
    resolve: (_source: unknown, { dto }, ctx: FastifyInstance) => {
      return createPost(dto, ctx);
    },
  },

  changePost: {
    type: PostType,
    args: {
      dto: {
        type: PostChangeType,
      },
      id: {
        type: UUIDType,
      },
    },
    resolve: (_source: unknown, { id, dto }, ctx: FastifyInstance) => {
      return updatePost(id, dto, ctx);
    },
  },

  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: (_source: unknown, { id }, ctx: FastifyInstance) => {
      return deletePost(id, ctx);
    },
  },
};
