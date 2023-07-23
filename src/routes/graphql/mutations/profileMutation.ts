import { GraphQLBoolean, GraphQLNonNull } from 'graphql';

import {
  createProfile,
  deleteProfile,
  updateProfile,
} from '../actions/profileActions.js';
import { Context } from '../types/context.js';
import { ProfileChangeType, ProfileCreateType, ProfileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';

export const profileMutations = {
  createProfile: {
    type: ProfileType,
    args: {
      dto: {
        type: ProfileCreateType,
      },
    },
    resolve: (_source: unknown, { dto }, ctx: Context) => {
      return createProfile(dto, ctx);
    },
  },

  changeProfile: {
    type: ProfileType,
    args: {
      dto: {
        type: ProfileChangeType,
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id, dto }, ctx: Context) => {
      return updateProfile(id, dto, ctx);
    },
  },

  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: (_source: unknown, { id }, ctx: Context) => {
      return deleteProfile(id, ctx);
    },
  },
};
