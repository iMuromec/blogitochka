import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Update User
 */
export async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string | undefined
) {
  const data = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: JSON.parse(data),
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
