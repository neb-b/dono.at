import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import Tip from "components/TipFlow";
import Edit from "components/EditFlow";
import { Text, Box, Flex } from "rebass/styled-components";
import * as cookie from "cookie";
import Image from "next/image";

import { getProfileData } from "../lib/db";

import { UserContext } from "./_app";

export default function TipPage({ username, apiUser }) {
  const { user, setUser } = React.useContext(UserContext);
  const {
    query: { view },
  } = useRouter();

  const apiUserData = JSON.stringify(apiUser);
  React.useEffect(() => {
    setUser(JSON.parse(apiUserData));
  }, [apiUserData, setUser]);

  return (
    <Box maxWidth={460} mx="auto">
      {user && user.isLoggedIn !== undefined && (
        <>
          <Flex mb={2} alignItems="center">
            <Box
              sx={{
                img: {
                  borderRadius: 10,
                },
              }}
            >
              <Image
                alt="Profile picture"
                height={75}
                width={75}
                src={user.thumbnail}
              />
            </Box>
            <Text fontSize={24} ml={2}>
              {username}
            </Text>
          </Flex>
          {user.isLoggedIn && !view ? (
            <Edit username={username} {...user} />
          ) : (
            <Tip username={username} {...user} />
          )}
        </>
      )}
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;
  const { auth_token } = cookie.parse(context.req.headers.cookie || "");

  // wtf is this
  const ignored = ["requestProvider.js.map", "favicon.ico", "_next"];
  if (ignored.includes(username)) {
    return { props: {} };
  }

  try {
    const user = await getProfileData(username, auth_token);
    if (!user) {
      return { redirects: { destination: "/404", permanent: false } };
    }

    return {
      props: { username, apiUser: user || undefined },
    };
  } catch (error) {
    console.log("error", error);
    return { props: {} };
  }
}
