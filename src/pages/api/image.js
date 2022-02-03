import * as cookie from "cookie";
import multiparty from "multiparty";
import { getDataFromAuthToken, updateUserData } from "../../lib/db";
import { s3Client, bucket } from "../../lib/s3";

async function handler(req, res) {
  const { auth_token } = cookie.parse(req.headers.cookie || "");

  if (!auth_token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const { username } = getDataFromAuthToken(auth_token);

    if (!username) {
      return res.status(401).json({ message: "not_authorized" });
    }

    var form = new multiparty.Form();

    form.on("part", (part) => {
      if (part.name === "image") {
        s3Client.putObject(
          {
            Bucket: bucket,
            Key: part.filename,
            ACL: "public-read",
            Body: part,
            ContentLength: part.byteCount,
          },
          (err) => {
            if (err) throw err;
            const coverUrl = `${process.env.S3_URL_PREFIX}${part.filename}`;

            updateUserData(username, auth_token, { coverUrl })
              .then((user) => {
                res.status(200).json({ user });
              })
              .catch((err) => {
                throw err;
              });
          }
        );
      }
    });

    form.on("error", function (err) {
      res.status(400).json({ message: "Error uploading photo" });
    });

    form.parse(req);
  } catch (error) {
    res.status(400).json({ message: "Error uploading photo" });
  }
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
