import Link from "next/link";
import { Box, Flex, Button, Text } from "rebass/styled-components";
import * as cookie from "cookie";
import Layout from "components/Layout";

import { getDataFromAuthToken } from "../lib/db";

export default function Home({ user }) {
  return (
    <Layout user={user}>
      <Box my={6} maxWidth={800} mx="auto">
        <Flex
          alignItems="center"
          flexDirection={["column", "column", "column"]}
        >
          <Box px={[4, 4, 0]}>
            <Text fontSize={[48, 64]} lineHeight={1.1} fontWeight="bold">
              Lightning Fast Livestream Donations
            </Text>

            <Link href="/nebb_bb" passHref>
              <Button variant="primary" mt={4}>
                <Text display={["none", "block"]}>
                  View Example Donation Page
                </Text>
                <Text display={["block", "none"]}>View Example Page</Text>
              </Button>
            </Link>
          </Box>
          <Flex
            alignItems={["flex-start", "flex-start", "center"]}
            justifyContent="space-between"
            mt={4}
            flexDirection={["column", "column", "row"]}
          >
            <Box
              mt={[4, 4, 5]}
              border="1px solid red"
              pl={[0, 2]}
              flexBasis={"50%"}
              flexGrow={0}
            >
              <Box
                as="video"
                width={["100%", 400]}
                autoPlay
                noControls
                loop
                muted
              >
                <source src="/assets/donation.mp4#t=0.1" type="video/mp4" />
              </Box>
            </Box>
            <Box flexBasis={"45%"} flexGrow={0} px={[4, 4, 0]} mt={[5, 4]}>
              <Text fontSize={32} fontWeight="bold" color="secondary">
                <Text display="inline-block" color="secondary">
                  Instant
                </Text>{" "}
                <Text display="inline-block" color="secondary">
                  Bitcoin
                </Text>
                <br />
                Donation Alerts
              </Text>
              <Text fontSize={24} mt={3} fontWeight="normal">
                Receive Bitcoin donations and convert them to $USD instantly.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { auth_token } = cookie.parse(context.req.headers.cookie || "");

  try {
    if (auth_token) {
      const { username } = getDataFromAuthToken(auth_token);

      if (username) {
        return { props: { user: { isLoggedIn: true, username } } };
      }
    }

    return {
      props: {
        user: {
          isLoggedIn: false,
        },
      },
    };
  } catch (error) {
    return { props: {} };
  }
}
