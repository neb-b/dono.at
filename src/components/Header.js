import React from "react";
import {
  Flex,
  Button,
  Text,
  Box,
  Link,
  Heading,
} from "rebass/styled-components";
import { UserContext } from "pages/_app";

import router, { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { user } = React.useContext(UserContext);
  const STREAM_LABS_AUTH = `https://streamlabs.com/api/v1.0/authorize?client_id=${process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI}&scope=donations.create+alerts.create&response_type=code`;

  return (
    <Flex alignItems="center" justifyContent="space-between" py={2} mb={4}>
      <Flex alignItems="flex-start">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Text
            fontWeight="bold"
            color="white"
            fontSize={24}
            sx={{
              ":hover": {
                textDecoration: "underline",
              },
            }}
          >
            dono.at
          </Text>
        </Link>
        {/* {user?.display_name && (
          <Text fontWeight="bold" color="white" fontSize={24}>
            {`/${user.display_name}`}
          </Text>
        )} */}
      </Flex>
      {user.isLoggedIn !== undefined && !user.isLoggedIn && (
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
