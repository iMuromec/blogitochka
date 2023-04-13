import { HttpMethod } from "@/types";
import {
  getPost,
  getPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} from "@/lib/api/posts";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const userId = session?.user?.id;

  const hostParts = req.headers.host?.split(".");
  const subdomain = hostParts && hostParts?.length > 2 && hostParts[0];

  const slug = req.query.slug as string;
  const user = Boolean(req.query.user);

  const hasAccess = session?.user?.subdomain === subdomain;

  if (!subdomain) {
    return res.status(404).end();
  }

  if (slug && !hasAccess) {
    return res.status(403).end();
  }

  if (user && !hasAccess) {
    return res.status(403).json({});
  }

  if (!HttpMethod.GET && !hasAccess && !userId) {
    return res.status(403).end();
  }

  switch (req.method) {
    case HttpMethod.GET:
      if (slug) {
        return getPost(req, res, userId, subdomain, slug);
      }

      if (user) {
        return getUserPosts(req, res, userId, subdomain);
      }

      return getPosts(req, res, subdomain);

    case HttpMethod.POST:
      return createPost(req, res, userId, subdomain);
    case HttpMethod.DELETE:
      const postId = req.query.postId as string;
      return deletePost(req, res, userId, subdomain, postId);
    case HttpMethod.PUT:
      return updatePost(req, res, userId, subdomain);
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.POST,
        HttpMethod.PUT,
        HttpMethod.DELETE,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
