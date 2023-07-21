import { FastifyInstance } from 'fastify';
import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';

import { getMemberTypeById } from '../actions/memberTypeActions.js';
import { getUserById } from '../actions/userActions.js';
import { MemberType } from './memberType.js';
import { MemberTypeId } from './memberTypeId.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
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
