import { FastifyInstance } from 'fastify';
import { GraphQLList } from 'graphql';

import { ProfileType } from '../types/profile.js';
import { getProfileById, getProfiles } from '../actions/profileActions.js';
import { UUIDType } from '../types/uuid.js';

export const profileQueries = {
  profile: {
    type: ProfileType,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: (_source: unknown, { id }, context: FastifyInstance) =>
      getProfileById(id, context),
  },
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: (_source: unknown, _args: unknown, context: FastifyInstance) =>
      getProfiles(context),
  },
};
