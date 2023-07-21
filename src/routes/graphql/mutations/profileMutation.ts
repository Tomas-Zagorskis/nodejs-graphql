import { FastifyInstance } from 'fastify';
import { GraphQLNonNull } from 'graphql';

import {
  createProfile,
  deleteProfile,
  updateProfile,
} from '../actions/profileActions.js';
import { ProfileChangeType, ProfileCreateType, ProfileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';

export const profileMutations = {
  createProfile: {
    type: ProfileType,
    args: {
      profileDTO: {
        type: ProfileCreateType,
      },
    },
    resolve: (_source: unknown, { profileDTO }, ctx: FastifyInstance) => {
      return createProfile(profileDTO, ctx);
    },
  },

  updateProfile: {
    type: ProfileType,
    args: {
      profileDTO: {
        type: ProfileChangeType,
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id, profileDTO }, ctx: FastifyInstance) => {
      return updateProfile(id, profileDTO, ctx);
    },
  },

  deleteProfile: {
    type: ProfileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id }, ctx: FastifyInstance) => {
      return deleteProfile(id, ctx);
    },
  },
};
