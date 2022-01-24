import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import Tip from "components/TipFlow";
import Edit from "components/EditFlow";
import { Box } from "rebass/styled-components";
import * as cookie from "cookie";

import { getProfileData } from "../lib/db";

import { UserContext } from "./_app";

export default function TipPage({ username, apiUser }) {
  const { user, setUser } = React.useContext(UserContext);

  const apiUserData = JSON.stringify(apiUser);
  React.useEffect(() => {
    console.log("userData", apiUserData);
    setUser(JSON.parse(apiUserData));
  }, [apiUserData, setUser]);

  return (
    <Box maxWidth={460} mx="auto">
      {user && (
        <>
          <h1>{username}</h1>
          {user.isLoggedIn ? <Edit /> : <Tip />}
        </>
      )}
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;
  const { auth_token } = cookie.parse(context.req.headers.cookie || "");

  // wtf is this
  const ignored = ["requestProvider.js.map", "favicon.ico"];
  if (ignored.includes(username)) {
    return { props: {} };
  }

  try {
    const user = await getProfileData(username, auth_token);
    if (!user) {
      return { redirects: { destination: "/404", permanent: false } };
    }

    // console.log("user", user);
    return {
      props: { username, apiUser: user || undefined },
    };
  } catch (error) {
    console.log("error", error);
    return { props: {} };
  }
}
