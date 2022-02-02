import * as cookie from "cookie";
import formidable from "formidable";

import { uploadCoverPhoto } from "../../lib/db";

async function handler(req, res) {
  const { auth_token } = cookie.parse(req.headers.cookie || "");

  if (!auth_token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const { image } = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({
        keepExtensions: true,
        filter: function ({ mimetype }) {
          return mimetype && mimetype.includes("image");
        },
      });

      form.parse(req, (err, _fields, file) => {
        if (err) return reject(err);
        resolve(file);
      });
    });

    const { url } = await uploadCoverPhoto(image);

    // updateUserData({ cover_photo: url });

    res.status(200).json({ url });
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
