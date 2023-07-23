import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { getUserById, getUsers } from '../actions/userActions.js';
import { Context } from '../types/context.js';
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
    resolve: (_source: unknown, { id }, context: Context) => {
      return getUserById(id, context);
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: (
      _source: unknown,
      _args: unknown,
      context: Context,
      info: GraphQLResolveInfo,
    ) => {
      return getUsers(context, info);
    },
  },
};
