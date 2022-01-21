import axios from "axios";
import { v4 as uuid } from "uuid";
import { getUser } from "../../lib/db";

async function apiRouteHandler(req, res) {
  const {
    body: { username, amount, from, message },
  } = req;

  try {
    const { access_token } = await getUser(username);

    const { data } = await axios.post(
      `https://streamlabs.com/api/v1.0/donations`,
      {
        access_token,
        currency: "USD",
        amount,
        identifier: uuid(),
        message,
        name: from,
      }
    );
    console.log("data", data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error authenticating" });
  }
}

export default apiRouteHandler;

// access_token: 'V8xf7ucaocG0NRxoErY0TwgmesLzScMrXK9YqKSE',
