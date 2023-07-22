import DataLoader from 'dataloader';

import { PrismaClient, Profile } from '@prisma/client';
import { MemberType } from './memberType.js';

export type Context = {
  prisma: PrismaClient;
  loader: Loader;
};

type Loader = {
  profile: DataLoader<string, Profile | undefined, string>;
};
