import { FastifyInstance } from 'fastify';

const getProfiles = async ({ prisma }: FastifyInstance) => {
  return await prisma.profile.findMany();
};

const getProfileById = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.profile.findFirst({ where: { id } });
};

export { getProfiles, getProfileById };
