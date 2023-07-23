import DataLoader from 'dataloader';

import { PrismaClient } from '@prisma/client';
import { Profile } from './types/profile.js';
import { Post } from './types/post.js';
import { User } from './types/user.js';
import { MemberType } from './types/memberType.js';

export default function loaders(prisma: PrismaClient) {
  return {
    user: userLoader(prisma),
    profile: profileLoader(prisma),
    post: postLoader(prisma),
    member: memberLoader(prisma),
  };
}

const userLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const users: User[] = await prisma.user.findMany({
      where: {
        id: { in: ids as string[] },
      },
      include: { subscribedToUser: true, userSubscribedTo: true },
    });

    const mappedUsers = ids.map((id) => users.find((user) => user.id === id));
    return mappedUsers;
  });
};

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

const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const posts: Post[] = await prisma.post.findMany({
      where: {
        authorId: { in: ids as string[] },
      },
    });
    const postsByAuthorId = new Map<string, Post[]>();

    posts.forEach((post) => {
      const authorPosts = postsByAuthorId.get(post.authorId) || [];
      authorPosts.push(post);
      postsByAuthorId.set(post.authorId, authorPosts);
    });

    const mappedPosts = ids.map((id) => postsByAuthorId.get(id));
    return mappedPosts;
  });
};

const memberLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const members: MemberType[] = await prisma.memberType.findMany({
      where: {
        id: { in: ids as string[] },
      },
    });

    const mappedMemberTypes = ids.map((id) => members.find((member) => member.id === id));
    return mappedMemberTypes;
  });
};
