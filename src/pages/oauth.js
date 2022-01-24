import axios from "axios";
import { Box } from "rebass/styled-components";
import jwt from "jsonwebtoken";
import { createOrUpdateUser, addAuthToken } from "../lib/db";

export default function Home(props) {
  return (
    <div>
      {props.error && (
        <Box bg="red" color="white" p={3} borderRadius={10}>
          <div>{props.error}</div>
        </Box>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { code: streamLabsCode } = context.query;

  try {
    // const {
    //   data: { access_token },
    // } = await axios.post(`https://streamlabs.com/api/v1.0/token`, {
    //   grant_type: "authorization_code",
    //   client_id: process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID,
    //   client_secret: process.env.STREAMLABS_CLIENT_SECRET,
    //   redirect_uri: process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI,
    //   code: streamLabsCode,
    // });

    // const {
    //   data: { streamlabs },
    // } = await axios.get(
    //   `https://streamlabs.com/api/v1.0/user?access_token=${access_token}`
    // );

    await createOrUpdateUser({
      // ...streamlabs,
      // access_token,
    });

    // const authToken = jwt.sign({ access_token }, process.env.JWT_SECRET);

    // await addAuthToken({
    //   authToken,
    //   username: streamlabs.username,
    // });

    // context.res.setHeader("set-cookie", `auth_token=${authToken}`);

    return { props: {} };
    return {
      redirect: { destination: `/${streamlabs.username}`, permanent: false },
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
