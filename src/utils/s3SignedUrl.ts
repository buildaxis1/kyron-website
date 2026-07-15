import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

if (!process.env.NEXT_PUBLIC_AWS_REGION) {
  throw new Error("NEXT_PUBLIC_AWS_REGION environment variable is not set");
}

if (!process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID) {
  throw new Error("NEXT_PUBLIC_AWS_ACCESS_KEY_ID environment variable is not set");
}

if (!process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY) {
  throw new Error("NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY environment variable is not set");
}

if (!process.env.NEXT_PUBLIC_S3_BUCKET_NAME) {
  throw new Error("NEXT_PUBLIC_S3_BUCKET_NAME environment variable is not set");
}

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function generateSignedGetUrl(
  key: string,
  expiresInSeconds = 300,
) {
  const getCommand = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, getCommand, {
    expiresIn: expiresInSeconds,
  });
  return signedUrl;
}
