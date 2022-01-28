import axios from "axios";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Tip from "components/TipFlow";
import Edit from "components/EditFlow";
import { Text, Box, Flex } from "rebass/styled-components";
import * as cookie from "cookie";
import Image from "next/image";

import { getProfileData } from "../lib/db";

import { UserContext } from "./_app";

export default function TipPage({ username, apiUser, hasEnabledTips }) {
  const { user, setUser } = React.useContext(UserContext);
  const {
    query: { view },
  } = useRouter();
  let profileLink;
  if (user.primary === "twitch") {
    profileLink = `twitch.tv/${username}`;
  } else if (user.primary === "facebook") {
    profileLink = `facebook.com/${username}`;
  } else {
    profileLink = `youtube.com/channel/${apiUser?.youtube_id}`;
  }

  const apiUserData = JSON.stringify(apiUser);
  React.useEffect(() => {
    let userData;
    try {
      userData = JSON.parse(apiUserData);
      setUser(userData);
    } catch (e) {
      // redirect to 404
    }
  }, [apiUserData, setUser]);

  return <Box sx={{ mx: "auto", maxWidth: "500px", pb: 4 }} mt={[5, 5]}></Box>;
}

export async function getServerSideProps(context) {
  const { auth_token } = cookie.parse(context.req.headers.cookie || "");

  try {
    const user = await getProfileData(auth_token);
    if (!user || user.username !== "cheese__omelette") {
      throw Error("not_authorized");
    }

    return {
      props: {
        username,
        user: user || undefined,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
}
