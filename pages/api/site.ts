import { HttpMethod } from "@/types";
import { getSite, createSite, updateSite } from "@/lib/api/site";

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
  let subdomain = hostParts && hostParts?.length > 2 && hostParts[0];

  if (req.query?.subdomain) {
    subdomain = req?.query?.subdomain as string;
  }

  switch (req.method) {
    case HttpMethod.GET:
      if (!subdomain) return res.status(403).end();
      return getSite(req, res, subdomain);

    case HttpMethod.POST:
      if (!userId) return res.status(403).end();
      return createSite(req, res, userId);

    case HttpMethod.PUT:
      if (!userId || session?.user?.subdomain !== subdomain) {
        return res.status(403).end();
      }
      return updateSite(req, res, userId, subdomain);

    default:
      res.setHeader("Allow", [HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
