import axios from "axios";
import { Box } from "rebass/styled-components";

export default function Home(props) {
  console.log("props", props);
  return (
    <div>
      {props.error && (
        <Box bg="red" color="white" p={3}>
          <div>{props.error.error}</div>
          <div>{props.error.error_description}</div>
        </Box>
      )}
      worked?
    </div>
  );
}

export async function getServerSideProps(context) {
  const { code: streamLabsCode } = context.query;
  console.log("streamlabs", streamLabsCode);
  const vals = {
    client_id: process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID,
    client_secret: process.env.STREAMLABS_CLIENT_SECRET,
    redirect_uri: process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI,
    code: streamLabsCode,
  };

  try {
    // const data = await axios.post(`https://streamlabs.com/api/v1.0/token`, {
    //   grant_type: "authorization_code",
    //   ...vals,
    // });

    const data = {};
    return {
      props: { data },
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data,
        vals,
      },
    };

    // return {
    //   redirect: {
    //     permanent: false,
    //     destination: "/?error=true",
    //   },
    // };
  }
  // const res = await fetch(`/api/users/${id}`);
  // const data = await res.json();
  // return { props: { user: data } };
}

// https://ln-streamlabs-donations.vercel.app/oauth?code=gn9w0RkJB358siF9auxZjiwhMSyFhV4Lg8a0KGsg
