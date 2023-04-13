import { extname } from "path";
import prisma from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2";
import { getUploadUrl } from "./cloud-storage";

import { NextApiRequest, NextApiResponse } from "next";

/**
 * Get uploadUrl and fileUrl
 */
export async function getUploadUrls(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  subdomain: string
) {
  try {
    const { fileName, fileType, postSlug } = req.query;

    if (!fileName || !fileType) {
      console.log({ fileName, fileType });
      throw new Error(
        `FileName: ${fileName} or FileType: ${fileType} is Empty`
      );
    }

    const site = await prisma.site.findFirst({
      select: {
        id: true,
      },
      where: {
        subdomain,
        userId,
      },
    });

    if (!site) {
      throw new Error("Site Not Found");
    }

    const fileExt = extname(fileName as string);
    const newFileName = `${createId()}${fileExt}`;
    const subFolder = postSlug || userId;
    const filePath = `sites/${site.id}/${subFolder}/${newFileName}`;

    const signedUrl = await getUploadUrl(filePath, fileType as string);
    const fileUrl = `${process.env.OBJ_BUCKET_URL}${filePath}`;

    return res.status(200).json({ signedUrl, fileUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
