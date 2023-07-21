import { FastifyInstance } from 'fastify';
import { ProfileDTO } from '../types/profile.js';

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

const createProfile = async (profile: ProfileDTO, { prisma }: FastifyInstance) => {
  return await prisma.profile.create({ data: profile });
};

const updateProfile = async (
  id: string,
  profile: Partial<ProfileDTO>,
  { prisma }: FastifyInstance,
) => {
  return await prisma.profile.update({
    where: {
      id,
    },
    data: profile,
  });
};

const deleteProfile = async (id: string, { prisma }: FastifyInstance) => {
  try {
    await prisma.profile.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
};

export {
  getProfiles,
  getProfileById,
  getProfilesByMemberTypeId,
  getProfileByUserId,
  createProfile,
  updateProfile,
  deleteProfile,
};
