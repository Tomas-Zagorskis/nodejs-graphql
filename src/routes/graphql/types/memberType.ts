import { FastifyInstance } from 'fastify';
import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';

import { getProfilesByMemberTypeId } from '../actions/profileActions.js';
import { MemberTypeId } from './memberTypeId.js';
import { ProfileType } from './profile.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: MemberTypeId,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: ({ id }, _args: unknown, context: FastifyInstance) => {
        return getProfilesByMemberTypeId(id, context);
      },
    },
  }),
});
