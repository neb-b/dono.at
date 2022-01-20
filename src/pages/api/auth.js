import axios from "axios";

async function apiRouteHandler(req, res) {
  // const {
  //   body: { streamLabsCode },
  // } = req;

  try {
    const vals = {
      client_id: process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID,
      client_secret: process.env.STREAMLABS_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI,
      code: "coTWCxmgXr4FFzXjExuizOQsWMXO5jYN9s6HHWy2",
    };

    const { data } = await axios.post(`https://streamlabs.com/api/v1.0/token`, {
      grant_type: "authorization_code",
      ...vals,
    });
    console.log("data", data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error authenticating" });
  }
}

export default apiRouteHandler;

// access_token: 'V8xf7ucaocG0NRxoErY0TwgmesLzScMrXK9YqKSE',

// const data = await axios.post(`https://streamlabs.com/api/v1.0/alerts`, {
//   access_token: "V8xf7ucaocG0NRxoErY0TwgmesLzScMrXK9YqKSE",
//   type: "donation",
//   message: `${"$0.1"} Lightning Donation`,
//   user_message: "hello world hello world hello world hello world",
// });
