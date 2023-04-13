// https://aws.amazon.com/ru/s3/
// or
// https://cloud.yandex.ru/services/storage

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.OBJ_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.OBJ_ACCESS_KEY as string,
    secretAccessKey: process.env.OBJ_SECRET_KEY as string,
  },
  endpoint: process.env.OBJ_ENDPOINT,
});

export async function getUploadUrl(filename: string, filetype: string) {
  let params = {
    Bucket: process.env.OBJ_BUCKET_NAME,
    Key: filename,
    ContentType: filetype,
    CacheControl: "max-age=630720000",
  };

  const uploadUrl = await getSignedUrl(s3Client, new PutObjectCommand(params), {
    expiresIn: 60 * 60,
  });

  return uploadUrl;
}

export async function deleteFileFromCloud(key: string) {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.OBJ_BUCKET_NAME,
      Key: key,
    })
  );
}
