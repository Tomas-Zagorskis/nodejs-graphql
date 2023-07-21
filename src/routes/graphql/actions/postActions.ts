import { FastifyInstance } from 'fastify';

const getPosts = async ({ prisma }: FastifyInstance) => {
  return await prisma.post.findMany();
};

const getPostById = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.post.findFirst({ where: { id } });
};

export { getPosts, getPostById };
