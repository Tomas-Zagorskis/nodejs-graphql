import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { MemberType } from '../types/memberType.js';
import { MemberTypeId } from '../types/memberTypeId.js';
import { getMemberTypeById, getMemberTypes } from '../actions/memberTypeActions.js';

export const memberTypeQueries = {
  memberType: {
    type: MemberType,
    args: {
      id: {
        type: new GraphQLNonNull(MemberTypeId),
      },
    },
    resolve: (_source: unknown, { id }, context: FastifyInstance) =>
      getMemberTypeById(id, context),
  },
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: (_source: unknown, _args: unknown, context: FastifyInstance) =>
      getMemberTypes(context),
  },
};
