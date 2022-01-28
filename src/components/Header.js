import React from "react";
import { Flex, Button, Text, Link } from "rebass/styled-components";

import { useRouter } from "next/router";
import { UserContext } from "pages/_app";

export default function Header({ user, color }) {
  const { contextUser = {}, setContextUser } = React.useContext(UserContext);
  const router = useRouter();
  const STREAM_LABS_AUTH = `https://streamlabs.com/api/v1.0/authorize?client_id=${process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI}&scope=donations.create+alerts.create&response_type=code`;

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py={2}
      mb={4}
      minHeight={80}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <Text
          fontWeight="bold"
          color="white"
          fontSize={24}
          sx={{
            ":hover": {
              color: "api",
            },
          }}
        >
          <Flex
            alignItems="flex-start"
            color={contextUser.color || color || "primary"}
            sx={{
              ":hover": {
                color: contextUser.color || color || "primaryLight",
                opacity: contextUser.color || color ? 0.9 : 1,
              },
            }}
          >
            dono.at
            {router.pathname !== "/" && (
              <Text display="inline" ml={1}>
                {"/"}
              </Text>
            )}
          </Flex>
        </Text>
      </Link>
      {user && !user.isLoggedIn && (
        <Link href={STREAM_LABS_AUTH}>
          <Button variant="secondary" mt={2}>
            <Text display={["none", "block"]}>Login with Streamlabs</Text>
            <Text display={["block", "none"]}>Login</Text>
          </Button>
        </Link>
      )}
    </Flex>
  );
}
