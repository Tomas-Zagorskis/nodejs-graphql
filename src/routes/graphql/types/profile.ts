import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import { getMemberTypeById } from '../actions/memberTypeActions.js';
import { getUserById } from '../actions/userActions.js';
import { MemberType } from './memberType.js';
import { MemberTypeId } from './memberTypeId.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';
import { Context } from '../types/context.js';

const profileDTO = {
  isMale: {
    type: GraphQLBoolean,
  },
  yearOfBirth: {
    type: GraphQLInt,
  },
};

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    ...profileDTO,
    user: {
      type: UserType,
      resolve: ({ userId }, _args: unknown, context: Context) => {
        return getUserById(userId, context);
      },
    },
    userId: {
      type: UUIDType,
    },
    memberType: {
      type: MemberType,
      resolve: ({ memberTypeId }, _args: unknown, context: Context) => {
        return getMemberTypeById(memberTypeId, context);
      },
    },
    memberTypeId: {
      type: MemberTypeId,
    },
  }),
});

export const ProfileCreateType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    ...profileDTO,
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeId),
    },
  }),
});

export const ProfileChangeType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    ...profileDTO,
  }),
});

export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

export type ProfileDTO = Omit<Profile, 'id'>;
