import { GraphQLObjectType } from 'graphql';
import { userMutations } from './mutations/userMutations.js';
import { profileMutations } from './mutations/profileMutation.js';

export const queryType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    ...userMutations,
    ...profileMutations,
  }),
});
