import React from "react";
import Tip from "components/TipFlow";
import Edit from "components/EditFlow";
import { Text, Box } from "rebass/styled-components";
import * as cookie from "cookie";
import Layout from "components/Layout";
import ProfileHeader from "components/ProfileHeader";

import { getUserFromAuthToken, getDataFromAuthToken, getUser } from "../lib/db";

export default function TipPage({ user, tipPage }) {
  const [view, setView] = React.useState("edit");
  const editing =
    user &&
    user.isLoggedIn &&
    tipPage.username.toUpperCase() === user.username.toUpperCase() &&
    view !== "tip";

  return (
    <Layout color={tipPage?.color} user={user} disableLogin={editing}>
      <Box
        sx={{
          mx: [undefined, "auto"],
          maxWidth: "500px",
          pb: 4,
        }}
        mt={[5, 4]}
      >
        {tipPage && (
          <Box sx={{}}>
            <ProfileHeader
              tipPage={tipPage}
              view={view}
              user={user}
              editing={editing}
            />

            <Box
              width={["100%", 400]}
              sx={{
                mx: "auto",
              }}
            >
              {editing ? (
                <Edit user={user} setView={setView} />
              ) : (
                <>
                  {tipPage.strike_username ? (
                    <Tip user={user} setView={setView} {...tipPage} />
                  ) : (
                    <Text ml={4} mt={4} fontWeight="normal">
                      This user hasn&apos;t enabled tips yet.
                    </Text>
                  )}
                </>
              )}
            </Box>
          </Box>
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
      let user;
      try {
        const { access_token, ...userFromAuthToken } =
          await getUserFromAuthToken(auth_token);

        user = userFromAuthToken;
      } catch (e) {
        const tipPageUser = await getUser(username);
        if (!tipPageUser) {
          throw "user_not_found";
        }

        const { access_token, ...tipPage } = tipPageUser;
        return {
          props: {
            user: { isLoggedIn: false },
            tipPage: { ...tipPage, username },
          },
        };
      }

      // This can be removed in the future
      if (!user) {
        const tipPageUser = await getUser(username);
        if (!tipPageUser) {
          throw "user_not_found";
        }

        const { access_token, ...tipPage } = tipPageUser;
        return {
          props: {
            user: { isLoggedIn: false },
            tipPage: { ...tipPage, username },
          },
        };
      }

      const { username: usernameFromAuthToken } =
        getDataFromAuthToken(auth_token);
      const isOwnPage =
        usernameFromAuthToken === username ||
        usernameFromAuthToken.toUpperCase() === username.toUpperCase();

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
            user: {
              ...user,
              username: usernameFromAuthToken,
              isLoggedIn: true,
            },
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
    console.log("error", error);
    if (error === "user_not_found") {
      return { notFound: true };
    }

    return { props: {} };
  }
}
