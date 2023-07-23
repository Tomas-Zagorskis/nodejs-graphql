import { GraphQLBoolean, GraphQLNonNull } from 'graphql';

import {
  createUser,
  deleteUser,
  subscribeTo,
  unsubscribeFrom,
  updateUser,
} from '../actions/userActions.js';
import { Context } from '../types/context.js';
import { UserChangeType, UserCreateType, UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

export const userMutations = {
  createUser: {
    type: UserType,
    args: {
      dto: {
        type: UserCreateType,
      },
    },
    resolve: (_source: unknown, { dto }, ctx: Context) => {
      return createUser(dto, ctx);
    },
  },

  changeUser: {
    type: UserType,
    args: {
      dto: {
        type: UserChangeType,
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id, dto }, ctx: Context) => {
      return updateUser(id, dto, ctx);
    },
  },

  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id }, ctx: Context) => {
      return deleteUser(id, ctx);
    },
  },

  subscribeTo: {
    type: UserType,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: (_source: unknown, { userId, authorId }, ctx: Context) => {
      return subscribeTo(userId, authorId, ctx);
    },
  },

  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: (_source: unknown, { userId, authorId }, ctx: Context) => {
      return unsubscribeFrom(userId, authorId, ctx);
    },
  },
};
