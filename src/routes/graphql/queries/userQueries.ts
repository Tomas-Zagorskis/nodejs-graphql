import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { getUserById, getUsers } from '../actions/userActions.js';
import { UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

export const userQueries = {
  user: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: string, { id }, context: FastifyInstance) => {
      return getUserById(id, context);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: (_source: string, _args: unknown, context: FastifyInstance) => {
      return getUsers(context);
    },
  },
};
