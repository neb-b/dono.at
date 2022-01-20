import axios from "axios";

async function apiRouteHandler(req, res) {
  try {
    // const data = await axios.post(`https://streamlabs.com/api/v1.0/token`, {
    //   grant_type: "authorization_code",
    //   client_id: process.env.STREAMLABS_CLIENT_ID,
    //   client_secret: process.env.STREAMLABS_CLIENT_SECRET,
    //   redirect_uri:
    //     "https://streamlabs-ln-donations.vercel.app/oauth/streamlabs",
    //   code: "92zbQt0WTVSAotcUEemmN31tsk4uzXhHWN6xpY3g",
    // });
    const data = await axios.post(`https://streamlabs.com/api/v1.0/alerts`, {
      access_token: "V8xf7ucaocG0NRxoErY0TwgmesLzScMrXK9YqKSE",
      type: "donation",
      message: `${"$0.1"} Lightning Donation`,
      user_message: "hello world hello world hello world hello world",
    });

    console.log("data", data);
  } catch (error) {
    console.log(error);
  }
}

export default apiRouteHandler;

// access_token: 'V8xf7ucaocG0NRxoErY0TwgmesLzScMrXK9YqKSE',
