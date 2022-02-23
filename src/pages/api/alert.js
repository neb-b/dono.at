import axios from "axios";
import { v4 as uuid } from "uuid";
import { getUser, logTx } from "../../lib/db";

async function apiRouteHandler(req, res) {
  const {
    body: { username, amount, from, message },
  } = req;

  try {
    console.log("start", Date.now());
    const { access_token } = await getUser(username);

    const { data } = await axios.post(
      `https://streamlabs.com/api/v1.0/donations`,
      // `https://streamlabs.com/api/v1.0/alerts`,
      {
        access_token,
        currency: "USD",
        amount,
        identifier: uuid(),
        message,
        name: from,

        // type: "donation",
        // message: `*${from}* donated *$${Number(amount).toFixed(2)}*!`,
        // user_message: message === "" ? " " : message,
        // special_text_color: "orange",
      }
    );

    console.log("stop", Date.now());

    await logTx({ amount, username, from, message, date: Date.now() });

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error authenticating" });
  }
}

export default apiRouteHandler;

// access_token: 'V8xf7ucaocG0NRxoErY0TwgmesLzScMrXK9YqKSE',
