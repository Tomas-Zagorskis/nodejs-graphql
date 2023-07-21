import { GraphQLObjectType } from 'graphql';

import { userQueries } from './queries/userQueries.js';
import { postQueries } from './queries/postQueries.js';
import { memberTypeQueries } from './queries/memberTypeQueries.js';

export const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ...userQueries,
    ...postQueries,
    ...memberTypeQueries,
  }),
});
