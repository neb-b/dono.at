import axios from "axios";
import { getAccessToken, getUser } from "../../lib/db";
import { createInvoice } from "../../lib/strike";

async function handler(req, res) {
  const {
    body: { username, amount },
  } = req;

  try {
    const { strike_username } = await getUser(username);
    console.log("??", strike_username);
    const data = await createInvoice({
      username: strike_username,
      amount,
      streamer_username: username,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Error authenticating" });
  }
}

export default handler;
