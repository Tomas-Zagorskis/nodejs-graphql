import DataLoader from 'dataloader';

import { PrismaClient } from '@prisma/client';
import { Profile } from './types/profile.js';
import { Post } from './types/post.js';
import { User } from './types/user.js';
import { MemberType } from './types/memberType.js';

export default function dataloader(prisma: PrismaClient) {
  return {
    profile: profileLoader(prisma),
    post: postLoader(prisma),
    member: memberLoader(prisma),
    userSubscribedTo: userSubscribedToLoader(prisma),
    subscribedToUser: subscribedToUserLoader(prisma),
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

const userSubscribedToLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const result = await prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: { in: ids as string[] | undefined } },
      select: { subscriberId: true, author: true },
    });

    const subsByAuthorId = new Map<string, User[]>();

    result.forEach(({ subscriberId, author }) => {
      const userSubscribedTo = subsByAuthorId.get(subscriberId) || [];
      userSubscribedTo.push(author);
      subsByAuthorId.set(subscriberId, userSubscribedTo);
    });

    const mappedSubs = ids.map((id) => subsByAuthorId.get(id));
    return mappedSubs;
  });
};

const subscribedToUserLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: Readonly<string[]>) => {
    const result = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: ids as string[] | undefined } },
      select: { authorId: true, subscriber: true },
    });

    const subsToAuthorId = new Map<string, User[]>();

    result.forEach(({ subscriber, authorId }) => {
      const userSubscriptions = subsToAuthorId.get(authorId) || [];
      userSubscriptions.push(subscriber);
      subsToAuthorId.set(authorId, userSubscriptions);
    });

    const mappedSubs = ids.map((id) => subsToAuthorId.get(id));
    return mappedSubs;
  });
};
