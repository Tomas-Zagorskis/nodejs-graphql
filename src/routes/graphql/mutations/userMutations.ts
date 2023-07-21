import { FastifyInstance } from 'fastify';
import { GraphQLNonNull } from 'graphql';

import { createUser, deleteUser, updateUser } from '../actions/userActions.js';
import { UserChangeType, UserCreateType, UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

export const userMutations = {
  createUser: {
    type: UserType,
    args: {
      userDTO: {
        type: UserCreateType,
      },
    },
    resolve: (_source: unknown, { userDTO }, ctx: FastifyInstance) => {
      return createUser(userDTO, ctx);
    },
  },

  updateUser: {
    type: UserType,
    args: {
      userDTO: {
        type: UserChangeType,
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id, userDTO }, ctx: FastifyInstance) => {
      return updateUser(id, userDTO, ctx);
    },
  },

  deleteUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id }, ctx: FastifyInstance) => {
      return deleteUser(id, ctx);
    },
  },
};
