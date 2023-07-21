import { FastifyInstance } from 'fastify';

const getProfiles = async ({ prisma }: FastifyInstance) => {
  return await prisma.profile.findMany({});
};

const getProfileById = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.profile.findFirst({ where: { id } });
};

const getProfileByUserId = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.profile.findFirst({ where: { userId: id } });
};

const getProfilesByMemberTypeId = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.profile.findMany({ where: { memberTypeId: id } });
};

export { getProfiles, getProfileById, getProfilesByMemberTypeId, getProfileByUserId };
