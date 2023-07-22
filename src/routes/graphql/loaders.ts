import DataLoader from 'dataloader';

import { PrismaClient } from '@prisma/client';
import { Profile } from './types/profile.js';

export default function dataloader(prisma: PrismaClient) {
  return {
    profile: profileLoader(prisma),
  };
}

const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const profiles: Profile[] = await prisma.profile.findMany({
      where: {
        userId: { in: ids as string[] },
      },
    });

    const mappedProfiles = ids.map((id) =>
      profiles.find((profile) => profile.userId === id),
    );
    return mappedProfiles;
  });
};
