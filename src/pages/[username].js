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
  const profileLink =
    user && user.primary === "twitch"
      ? `twitch.tv/${user.display_name}`
      : `youtube.com/${user.display_name}`;

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

  return (
    <Box sx={{ mx: "auto", maxWidth: "500px", pb: 4 }} mt={[5, 5]}>
      {user && user.isLoggedIn !== undefined && (
        <>
          <Flex mb={4} alignItems="center">
            <Box
              sx={{
                img: {
                  borderRadius: 10,
                },
              }}
            >
              <Image
                alt="Profile picture"
                height={50}
                width={50}
                src={user.thumbnail}
              />
            </Box>
            <Flex ml={[3]} flexDirection="column" justifyContent="center">
              <Text mt={-2} fontSize={[24, 32]}>
                {username}
              </Text>
              <Link href={`https://${profileLink}`}>
                <a
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Text
                    fontSize={12}
                    color="gray"
                    sx={{ ":hover": { color: "api" } }}
                  >
                    {profileLink}
                  </Text>
                </a>
              </Link>
            </Flex>
          </Flex>
          {user.isLoggedIn && !view ? (
            <Edit username={username} {...user} />
          ) : (
            <>
              {hasEnabledTips ? (
                <Tip username={username} {...user} />
              ) : (
                <Text ml={4} mt={4} fontWeight="normal">
                  This user hasn&apos;t enabled tips yet.
                </Text>
              )}
            </>
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
      return { notFound: true };
    }

    return {
      props: {
        username,
        apiUser: user || undefined,
        hasEnabledTips: Boolean(user.strike_username),
      },
    };
  } catch (error) {
    if (error === "user_not_found") {
      return { notFound: true };
    }

    return { props: {} };
  }
}
