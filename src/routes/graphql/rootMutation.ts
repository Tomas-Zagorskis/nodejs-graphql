import { GraphQLObjectType } from 'graphql';
import { postMutations } from './mutations/postMutations.js';
import { profileMutations } from './mutations/profileMutation.js';
import { userMutations } from './mutations/userMutations.js';

export const queryType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    ...userMutations,
    ...profileMutations,
    ...postMutations,
  }),
});
