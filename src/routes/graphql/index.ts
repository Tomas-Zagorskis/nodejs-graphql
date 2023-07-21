import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse, validate } from 'graphql';
import { queryType } from './rootQuery.js';

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
      });

      const parsedDocument = parse(req.body.query);
      const graphQLErrors = validate(schema, parsedDocument);

      if (graphQLErrors && graphQLErrors.length != 0) {
        return { data: '', errors: graphQLErrors };
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
