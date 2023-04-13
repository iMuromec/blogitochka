import { HttpMethod } from "@/types";
import { getUploadUrls } from "@/lib/file";

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

  if (!subdomain || !userId || session?.user?.subdomain !== subdomain) {
    return res.status(403).end();
  }

  switch (req.method) {
    case HttpMethod.GET:
      return getUploadUrls(req, res, userId, subdomain as string);

    default:
      res.setHeader("Allow", [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
