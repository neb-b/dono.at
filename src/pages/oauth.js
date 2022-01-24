import axios from "axios";
import { Box } from "rebass/styled-components";
import jwt from "jsonwebtoken";
import { createOrUpdateUser, addAuthToken } from "../lib/db";

export default function Home(props) {
  // console.log("props", props);
  return (
    <div>
      {props.error && (
        <Box bg="red" color="white" p={3}>
          <div>{props.error}</div>
        </Box>
      )}
      worked?
    </div>
  );
}

export async function getServerSideProps(context) {
  const { code: streamLabsCode } = context.query;

  try {
    const {
      data: { access_token },
    } = await axios.post(`https://streamlabs.com/api/v1.0/token`, {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID,
      client_secret: process.env.STREAMLABS_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI,
      code: streamLabsCode,
    });

    // const access_token = "HRgYMW718Y3oM0Otb3A3jJxp4BOGYSd4kazyPtbj";
    // console.log("??", access_token);

    const {
      data,
      data: { streamlabs },
    } = await axios.get(
      `https://streamlabs.com/api/v1.0/user?access_token=${access_token}`
    );

    // console.log("data", data);
    const user = await createOrUpdateUser({
      ...streamlabs,
      access_token,
    });

    const authToken = jwt.sign({ access_token }, process.env.JWT_SECRET);

    console.log("auth", authToken);
    await addAuthToken({
      authToken,
      username: "cheese__omelette" || streamlabs.username,
    });

    context.res.setHeader("set-cookie", `auth_token=${authToken}`);

    return {
      // props: { streamlabs: { username: "streamlabs" } },
      props: { streamlabs },
    };
  } catch (error) {
    console.log("data", error);
    return {
      props: {
        error: error.message || error.response.data.error_description,
      },
    };
  }
}

// https://ln-streamlabs-donations.vercel.app/oauth?code=gn9w0RkJB358siF9auxZjiwhMSyFhV4Lg8a0KGsg

//"SbBk6oPNQidxDMQj795sS8FUWvapqgTMDD7HwaPd"
