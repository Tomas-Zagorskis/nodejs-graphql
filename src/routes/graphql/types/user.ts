import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { getPostsByAuthorId } from '../actions/postActions.js';
import { getProfileByUserId } from '../actions/profileActions.js';
import { getSubscribersOfUser, getSubscriptionsOfUser } from '../actions/userActions.js';
import { Context } from '../types/context.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UUIDType } from './uuid.js';

const userDTO = {
  name: {
    type: GraphQLString,
  },
  balance: {
    type: GraphQLFloat,
  },
};

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    ...userDTO,
    profile: {
      type: ProfileType,
      resolve: ({ id }, _args: unknown, context: Context) => {
        return getProfileByUserId(id, context);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: ({ id }, _args: unknown, context: Context) => {
        return getPostsByAuthorId(id, context);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: (user: User, _args: unknown, context: Context) => {
        return getSubscribersOfUser(user, context);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: (user: User, _args: unknown, context: Context) => {
        return getSubscriptionsOfUser(user, context);
      },
    },
  }),
});

export const UserCreateType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
});

export const UserChangeType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    ...userDTO,
  }),
});

export type User = {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: {
    subscriberId: string;
    authorId: string;
  }[];
  subscribedToUser?: {
    subscriberId: string;
    authorId: string;
  }[];
};

export type UserDTO = {
  name: string;
  balance: number;
};
