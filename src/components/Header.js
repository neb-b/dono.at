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
  const { user } = React.useContext(UserContext);
  const STREAM_LABS_AUTH = `https://streamlabs.com/api/v1.0/authorize?client_id=${process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI}&scope=donations.create+alerts.create&response_type=code`;

  return (
    <Flex alignItems="flex-end" justifyContent="space-between" py={4}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Text
          fontWeight="bold"
          color="white"
          fontSize={48}
          sx={{
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          ln-tips
        </Text>
      </Link>
      {!user.isLoggedIn && (
        <Link href={STREAM_LABS_AUTH}>
          <Button variant="secondary" mt={2}>
            Login with Streamlabs
          </Button>
        </Link>
      )}
    </Flex>
  );
}
