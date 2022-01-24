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
      <Heading>TBD</Heading>
      {user && !user.isLoggedIn && (
        <Link href={STREAM_LABS_AUTH}>
          <Button
            variant="primary"
            mt={2}
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, type: "streamlabs" },
              })
            }
          >
            Login with Streamlabs
          </Button>
        </Link>
      )}
    </Flex>
  );
}
