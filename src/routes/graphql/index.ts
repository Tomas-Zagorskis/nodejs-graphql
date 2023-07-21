import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { GraphQLSchema, graphql, parse, validate } from 'graphql';

import { mutationType } from './rootMutation.js';
import { queryType } from './rootQuery.js';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const schema = new GraphQLSchema({
        query: queryType,
        mutation: mutationType,
      });

      const parsedDocument = parse(req.body.query);
      const graphQLErrors = validate(schema, parsedDocument);

      if (graphQLErrors && graphQLErrors.length != 0) {
        return { data: null, errors: graphQLErrors };
      }
      const { data, errors } = await graphql({
        schema,
        source: req.body.query,
        contextValue: fastify,
        variableValues: req.body.variables,
      });

      return { data, errors };
    },
  });
};

export default plugin;
