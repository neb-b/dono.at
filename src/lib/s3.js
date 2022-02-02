import AWS from "aws-sdk";

const albumBucketName = "dono.at";
const bucketRegion = "us-east-2";
const identityPoolId = "us-east-2:c54666b0-46bf-43af-a8c4-94d4dce9e89e";

const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

AWS.config.update({
  region: bucketRegion,
  accessKeyId,
  secretAccessKey,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  }),
});

const s3 = new AWS.S3({
  apiVersion: "2022-02-01",
  params: { Bucket: albumBucketName },
});

export async function uploadFile(name, file) {
  return new Promise(async (resolve, reject) => {
    try {
      var base64data = Buffer.from(JSON.stringify(file), "binary");

      s3.upload(
        {
          Bucket: albumBucketName,
          Key: name,
          Body: base64data,
        },
        (err, data) => {
          if (err) {
            console.log("?", err);
            reject(err);
          }

          console.log("data", data);
          reject(data);
        }
      );

      resolve("url");
    } catch (err) {
      reject(err);
    }
  });
}
