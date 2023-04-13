import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { getSigninUrl } from "@/lib/utils";

export default async function checkAccess(
  req: any,
  res: any,
  subdomain: string | undefined
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    const destination = getSigninUrl(req.url, req.headers.host);
    return { destination };
  }

  if (session?.user?.subdomain !== subdomain) {
    const destination = `${process.env.NEXTAUTH_URL}/error?error=AccessDenied`;
    return { destination };
  }

  return false;
}
