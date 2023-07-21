import { GraphQLObjectType } from 'graphql';
import { userMutations } from './mutations/userMutations.js';

export const queryType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    ...userMutations,
  }),
});
