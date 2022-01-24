import axios from "axios";
import { getAccessToken, getUser } from "../../lib/db";
import { createInvoice } from "../../lib/strike";

async function handler(req, res) {
  const {
    body: { username, amount = 1 },
  } = req;

  try {
    const { strike_username } = await getUser(username);
    const data = await createInvoice({ username: strike_username, amount });
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Error authenticating" });
  }
}

export default handler;
