import { FastifyInstance } from 'fastify';
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
      resolve: ({ userId }, _args: unknown, context: FastifyInstance) => {
        return getUserById(userId, context);
      },
    },
    userId: {
      type: UUIDType,
    },
    memberType: {
      type: MemberType,
      resolve: ({ memberTypeId }, _args: unknown, context: FastifyInstance) => {
        return getMemberTypeById(memberTypeId, context);
      },
    },
    memberTypeId: {
      type: MemberTypeId,
    },
  }),
});

export const ProfileCreateType = new GraphQLInputObjectType({
  name: 'ProfileCreate',
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
  name: 'ProfileChange',
  fields: () => ({
    ...profileDTO,
  }),
});

export type ProfileDTO = {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};
