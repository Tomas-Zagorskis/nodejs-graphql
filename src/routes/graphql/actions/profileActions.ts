import { Context } from '../types/context.js';
import { ProfileDTO } from '../types/profile.js';

const getProfiles = async ({ prisma }: Context) => {
  return await prisma.profile.findMany({});
};

const getProfileById = async (id: string, { prisma }: Context) => {
  return await prisma.profile.findFirst({ where: { id } });
};

const getProfileByUserId = async (id: string, { loader }: Context) => {
  return await loader.profile.load(id);
};

const getProfilesByMemberTypeId = async (id: string, { prisma }: Context) => {
  return await prisma.profile.findMany({ where: { memberTypeId: id } });
};

const createProfile = async (profile: ProfileDTO, { prisma }: Context) => {
  return await prisma.profile.create({ data: profile });
};

const updateProfile = async (
  id: string,
  profile: Partial<ProfileDTO>,
  { prisma }: Context,
) => {
  return await prisma.profile.update({
    where: {
      id,
    },
    data: profile,
  });
};

const deleteProfile = async (id: string, { prisma }: Context) => {
  try {
    await prisma.profile.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
};

export {
  createProfile,
  deleteProfile,
  getProfileById,
  getProfileByUserId,
  getProfiles,
  getProfilesByMemberTypeId,
  updateProfile,
};
