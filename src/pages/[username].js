import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Tip from "components/TipFlow";
import Edit from "components/EditFlow";
import { Text, Box, Flex } from "rebass/styled-components";
import * as cookie from "cookie";
import Image from "next/image";
import Layout from "components/Layout";

import { getUserFromAuthToken, getDataFromAuthToken, getUser } from "../lib/db";

export default function TipPage({ user, tipPage }) {
  const {
    query: { view },
  } = useRouter();
  let profileLink;
  if (tipPage) {
    if (tipPage.primary === "twitch") {
      profileLink = `twitch.tv/${tipPage.username}`;
    } else if (tipPage.primary === "facebook") {
      profileLink = `facebook.com/${tipPage.username}`;
    } else {
      profileLink = `youtube.com/channel/${tipPage.youtube_id}`;
    }
  }

  return (
    <Layout color={tipPage?.color} user={user}>
      <Box sx={{ mx: "auto", maxWidth: "500px", pb: 4 }} mt={[5, 5]}>
        {tipPage && (
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
                  src={tipPage.thumbnail}
                />
              </Box>
              <Flex ml={[3]} flexDirection="column" justifyContent="center">
                <Text mt={-2} fontSize={[24, 32]}>
                  {tipPage.username}
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
                      sx={{ ":hover": { color: user.color || "api" } }}
                    >
                      {profileLink}
                    </Text>
                  </a>
                </Link>
              </Flex>
            </Flex>
            {user.isLoggedIn && tipPage.username === user.username && !view ? (
              <Edit user={user} />
            ) : (
              <>
                {tipPage.strike_username ? (
                  <Tip user={user} {...tipPage} />
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
    </Layout>
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
    // Determine if it's the user's own page
    // If it is we only need to go to the db once
    if (auth_token) {
      const { access_token, ...user } = await getUserFromAuthToken(auth_token);

      const { username: usernameFromAuthToken } =
        getDataFromAuthToken(auth_token);
      const isOwnPage = usernameFromAuthToken === username;

      if (isOwnPage) {
        return {
          props: {
            user: {
              isLoggedIn: true,
              username: usernameFromAuthToken,
              ...user,
            },
            tipPage: { username, ...user },
          },
        };
      } else {
        // Need to get user and tipPage separately
        const tipPageUser = await getUser(username);
        if (!tipPageUser) {
          throw "user_not_found";
        }

        const { access_token, ...tipPage } = tipPageUser;
        return {
          props: {
            user: { ...user, isLoggedIn: true },
            tipPage: { ...tipPage, username },
          },
        };
      }
    }

    const tipPageUser = await getUser(username);
    if (!tipPageUser) {
      return { notFound: true };
    }

    const { access_token, ...tipPage } = await getUser(username);
    return {
      props: {
        tipPage: { ...tipPage, username },
        user: { isLoggedIn: false },
      },
    };
  } catch (error) {
    if (error === "user_not_found") {
      return { notFound: true };
    }

    return { props: {} };
  }
}
