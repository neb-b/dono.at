import axios from "axios";
import { Box } from "rebass/styled-components";

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
    return {
      props: { streamlabs },
    };
  } catch (error) {
    console.log("data", error.message);
    return {
      props: {
        error: error.message || error.response.data.error_description,
      },
    };
  }
}

// https://ln-streamlabs-donations.vercel.app/oauth?code=gn9w0RkJB358siF9auxZjiwhMSyFhV4Lg8a0KGsg

//"SbBk6oPNQidxDMQj795sS8FUWvapqgTMDD7HwaPd"
