import { FastifyInstance } from 'fastify';

import { createPost, deletePost, updatePost } from '../actions/postActions.js';
import { PostChangeType, PostCreateType, PostType } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';

export const postMutations = {
  createPost: {
    type: PostType,
    args: {
      postDTO: {
        type: PostCreateType,
      },
    },
    resolve: (_source: unknown, { postDTO }, ctx: FastifyInstance) => {
      return createPost(postDTO, ctx);
    },
  },

  updatePost: {
    type: PostType,
    args: {
      postDTO: {
        type: PostChangeType,
      },
      id: {
        type: UUIDType,
      },
    },
    resolve: (_source: unknown, { id, postDTO }, ctx: FastifyInstance) => {
      return updatePost(id, postDTO, ctx);
    },
  },

  deletePost: {
    type: PostType,
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
