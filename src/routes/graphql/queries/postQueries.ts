import { GraphQLList, GraphQLNonNull } from 'graphql';

import { getPostById, getPosts } from '../actions/postActions.js';
import { Context } from '../types/context.js';
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
    resolve: (_source: unknown, { id }, context: Context) => {
      return getPostById(id, context);
    },
  },
  posts: {
    type: new GraphQLList(PostType),
    resolve: (_source: unknown, _args: unknown, context: Context) => {
      return getPosts(context);
    },
  },
};
