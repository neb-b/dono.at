import AWS from "aws-sdk";

export const bucket = process.env.S3_BUCKET;
export const s3Client = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});
