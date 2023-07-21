import { FastifyInstance } from 'fastify';

import { PostDTO } from '../types/post.js';

const getPosts = async ({ prisma }: FastifyInstance) => {
  return await prisma.post.findMany();
};

const getPostsByAuthorId = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.post.findMany({ where: { authorId: id } });
};

const getPostById = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.post.findFirst({ where: { id } });
};

const createPost = async (post: PostDTO, { prisma }: FastifyInstance) => {
  return await prisma.post.create({ data: post });
};

const updatePost = async (
  id: string,
  post: Partial<PostDTO>,
  { prisma }: FastifyInstance,
) => {
  return await prisma.post.update({
    where: {
      id,
    },
    data: post,
  });
};

const deletePost = async (id: string, { prisma }: FastifyInstance) => {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    return true;
  } catch {
    return false;
  }
};

export { getPosts, getPostsByAuthorId, getPostById, createPost, updatePost, deletePost };
