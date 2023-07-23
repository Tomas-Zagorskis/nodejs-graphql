import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { getUserById } from '../actions/userActions.js';
import { Context } from '../types/context.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';

const postDTO = {
  title: {
    type: GraphQLString,
  },
  content: {
    type: GraphQLString,
  },
};

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    ...postDTO,
    author: {
      type: UserType,
      resolve: ({ authorId }, _args: unknown, context: Context) => {
        return getUserById(authorId, context);
      },
    },
    authorId: {
      type: UUIDType,
    },
  }),
});

export const PostCreateType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    ...postDTO,
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  }),
});

export const PostChangeType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    ...postDTO,
  }),
});

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type PostDTO = Omit<Post, 'id'>;
