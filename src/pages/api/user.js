import axios from "axios";
import * as cookie from "cookie";
import { updateUserData } from "../../lib/db";
import { createInvoice } from "../../lib/strike";

async function handler(req, res) {
  const {
    body: { username, strikeUsername, tipAmount },
  } = req;
  const { auth_token } = cookie.parse(req.headers.cookie || "");

  if (!auth_token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const user = await updateUserData(username, auth_token, {
      strikeUsername,
      tipAmount,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Error authenticating" });
  }
}

export default handler;
