import { createId } from "@paralleldrive/cuid2";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

import type { Site } from "@prisma/client";

/**
 * Get Site
 */
export async function getSite(
  req: NextApiRequest,
  res: NextApiResponse,
  subdomain: string
): Promise<void | NextApiResponse<Array<Site> | (Site | null)>> {
  try {
    const site = await prisma.site.findFirst({
      select: {
        subdomain: true,
        logo: true,
        name: true,
        description: true,
      },
      where: {
        subdomain,
      },
    });

    if (!site?.subdomain) return res.status(404).end();

    return res.status(200).json(site);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Site
 */
export async function createSite(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string | undefined
): Promise<void | NextApiResponse<Site>> {
  if (!userId) return res.status(403).end();

  const body = req.body;

  try {
    const data = JSON.parse(body);

    data.subdomain = data.subdomain
      ?.replace(/[^a-zA-Z0-9/-]+/g, createId())
      .toLowerCase();

    data.user = {
      connect: {
        id: userId,
      },
    };

    const [site, user] = await prisma.$transaction([
      prisma.site.create({
        data,
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          subdomain: data.subdomain,
        },
      }),
    ]);

    return res.status(200).json(site);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Site
 */
export async function updateSite(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string | undefined,
  subdomain: string | undefined
): Promise<void | NextApiResponse<Site>> {
  const body = req.body;

  try {
    const data = JSON.parse(body);

    if (data?.subdomain) {
      data.subdomain = data.subdomain
        ?.replace(/[^a-zA-Z0-9/-]+/g, "")
        .toLowerCase();
      if (!data?.subdomain) return res.status(400).end();
    }

    const [site, user] = await prisma.$transaction([
      prisma.site.updateMany({
        where: {
          subdomain,
          userId,
        },
        data,
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          subdomain: data.subdomain,
        },
      }),
    ]);

    return res.status(200).json(site);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
