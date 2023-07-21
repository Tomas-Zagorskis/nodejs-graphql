import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { getMemberTypeById, getMemberTypes } from '../actions/memberTypeActions.js';
import { MemberType } from '../types/memberType.js';
import { MemberTypeId } from '../types/memberTypeId.js';

export const memberTypeQueries = {
  memberType: {
    type: MemberType,
    args: {
      id: {
        type: new GraphQLNonNull(MemberTypeId),
      },
    },
    resolve: (_source: string, { id }, context: FastifyInstance) => {
      return getMemberTypeById(id, context);
    },
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: (_source: string, _args: unknown, context: FastifyInstance) => {
      return getMemberTypes(context);
    },
  },
};
