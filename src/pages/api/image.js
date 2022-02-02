import * as cookie from "cookie";
import multiparty from "multiparty";

import { bucket, s3Client } from "../../lib/s3";

async function handler(req, res) {
  const { auth_token } = cookie.parse(req.headers.cookie || "");

  if (!auth_token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    var form = new multiparty.Form();

    form.on("part", function (part) {
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
          const url = `${process.env.S3_URL_PREFIX}${part.filename}`;

          res.status(200).json({ url });
        }
      );
    });

    form.parse(req);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Error authenticating" });
  }
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
