import { GraphQLList, GraphQLNonNull } from 'graphql';

import { getProfileById, getProfiles } from '../actions/profileActions.js';
import { Context } from '../types/context.js';
import { ProfileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';

export const profileQueries = {
  profile: {
    type: ProfileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id }, context: Context) => {
      return getProfileById(id, context);
    },
  },
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: (_source: unknown, _args: unknown, context: Context) => {
      return getProfiles(context);
    },
  },
};
