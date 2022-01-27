import React from "react";
import Link from "next/link";
import TwitterLogo from "components/TwitterLogo";
import GithubLogo from "components/GithubLogo";
import { Flex, Button, Text, Box, Heading } from "rebass/styled-components";

export default function Header() {
  return (
    <Box mt="auto">
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        py={2}
        px={4}
        mt={[2, 5]}
        minHeight={80}
        sx={{ borderTop: "1px solid #222" }}
      >
        <Link href="https://github.com/neb-b/dono.at" passHref>
          <Text
            display="flex"
            alignItems="center"
            fontSize={12}
            fontWeight="normal"
            sx={{
              ":hover": { cursor: "pointer", textDecoration: "underline" },
            }}
          >
            <GithubLogo />
            <Text fontWeight="normal" ml={2}>
              Github
            </Text>
          </Text>
        </Link>
        <Link href="https://twitter.com/neb_b" passHref>
          <Text
            ml={3}
            fontSize={12}
            display="flex"
            alignItems="center"
            color="#1da1f2"
            sx={{
              ":hover": { cursor: "pointer", textDecoration: "underline" },
            }}
          >
            <TwitterLogo />
            <Text fontWeight="normal" ml={1}>
              @neb_b
            </Text>
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}
