import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { getProfileById, getProfiles } from '../actions/profileActions.js';
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
    resolve: (_source: string, { id }, context: FastifyInstance) => {
      return getProfileById(id, context);
    },
  },
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: (_source: string, _args: unknown, context: FastifyInstance) => {
      return getProfiles(context);
    },
  },
};
