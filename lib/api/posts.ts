import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

import type { Post, Site } from "@prisma/client";

interface AllPosts {
  posts: Array<Post>;
  site: Site | null;
}

/**
 * Get Post
 *
 * Fetches & returns a single post
 */
export async function getPost(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string | undefined,
  subdomain: string,
  slug: string
): Promise<void | NextApiResponse<AllPosts | null>> {
  try {
    const post = await prisma.post.findFirst({
      where: {
        slug,
        author: {
          id: userId,
          subdomain,
        },
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Get Posts
 *
 * Fetches & returns either all posts or by search query available. Posts are
 * returned in descending order. Max limit is 100 posts
 */
export async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse,
  subdomain: string | undefined
) {
  let { limit = 10, skip = 0, search = null } = req.query;

  const maxLimit = 100;
  limit = Number(limit);
  limit = limit > maxLimit ? maxLimit : limit;

  try {
    const where: any = {
      site: {
        subdomain,
      },
      published: true,
    };

    if (search) {
      where["title"] = {
        contains: String(search),
        mode: "insensitive",
      };
    }

    const [total, posts] = await prisma.$transaction([
      prisma.post.count({
        where,
      }),
      prisma.post.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          image: true,
          createdAt: true,
          published: true,
        },
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: Number(skip),
        take: limit,
      }),
    ]);

    return res.status(200).json({ posts, total, skip, limit });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Get User Posts
 *
 * Fetches & returns either all User posts or User posts by search query available. Posts are
 * returned in descending order. Max limit is 100 posts
 */
export async function getUserPosts(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string | undefined,
  subdomain: string | undefined
) {
  let { limit = 10, skip = 0, search = null } = req.query;

  const maxLimit = 100;
  limit = Number(limit);
  limit = limit > maxLimit ? maxLimit : limit;

  try {
    const where: any = {
      site: {
        user: {
          id: userId,
        },
        subdomain,
      },
    };

    if (search) {
      where["title"] = {
        contains: String(search),
        mode: "insensitive",
      };
    }

    const [total, posts] = await prisma.$transaction([
      prisma.post.count({
        where,
      }),
      prisma.post.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          image: true,
          createdAt: true,
          published: true,
        },
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: Number(skip),
        take: limit,
      }),
    ]);

    return res.status(200).json({ posts, total, skip, limit });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Post
 *
 * Creates a new post.
 * Once created, the post slug` will be returned.
 */
export async function createPost(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string | undefined,
  subdomain: string | undefined
): Promise<void | NextApiResponse<{
  slug: string;
}>> {
  try {
    const post = await prisma.post.create({
      data: {
        site: {
          connect: {
            subdomain,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res.status(201).json({
      slug: post.slug,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Post
 *
 * Updates a post & all of its data using a collection of provided
 * query parameters. These include the following:
 *  - id
 *  - title
 *  - content
 *  - slug
 *  - image
 *  - published
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function updatePost(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string | undefined,
  subdomain: string | undefined
): Promise<void | NextApiResponse<Post>> {
  const body = req.body;
  const data = body?.content
    ? { ...body, content: JSON.parse(body.content) }
    : { ...body };

  try {
    const post = await prisma.post.updateMany({
      where: {
        id: body.id,
        site: {
          subdomain,
        },
        author: {
          id: userId,
        },
      },
      data,
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Post
 *
 */
export async function deletePost(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string | undefined,
  subdomain: string | undefined,
  postId: string
): Promise<void | NextApiResponse<AllPosts | null>> {
  try {
    const post = await prisma.post.deleteMany({
      where: {
        id: postId,
        authorId: userId,
        site: {
          user: {
            id: userId,
          },
          subdomain,
        },
      },
    });
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
