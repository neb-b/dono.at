import React from "react";
import { Flex, Button, Box, Text, Link } from "rebass/styled-components";

import { useRouter } from "next/router";
import { UserContext } from "pages/_app";

export default function Header({ user, color, disableLogin }) {
  const { contextUser = {} } = React.useContext(UserContext);
  const router = useRouter();

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      py={2}
      px={[4]}
      mb={4}
      minHeight={[70, 80]}
      sx={{
        zIndex: 4,
        position: "relative",
        width: disableLogin ? "180px" : "auto",
      }}
    >
      <Box sx={{}}>
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
      </Box>

      {!disableLogin && user && !user.isLoggedIn && (
        <Link href="/login">
          <Button variant="secondary" mt={2}>
            <Text>Login</Text>
          </Button>
        </Link>
      )}
      {!disableLogin &&
        user &&
        router.query.username !== user.username &&
        user.isLoggedIn && (
          <Link href={`/${user.username}`}>
            <Button variant="link" mt={2}>
              <Text display={["none", "block"]}>{user.username}</Text>
              <Text display={["block", "none"]}>Profile</Text>
            </Button>
          </Link>
        )}
    </Flex>
  );
}
