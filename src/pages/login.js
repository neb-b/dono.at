import Link from "next/link"
import { Box, Flex, Button, Text } from "rebass/styled-components"
import * as cookie from "cookie"
import Layout from "components/Layout"

import { getDataFromAuthToken } from "../lib/db"

const STREAM_LABS_AUTH = `https://streamlabs.com/api/v1.0/authorize?client_id=${process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI}&scope=donations.create+alerts.create&response_type=code`

export default function Login({ user }) {
  return (
    <Layout user={user} disableLogin>
      <Box my={6} maxWidth={800} mx="auto">
        <Flex alignItems="center" flexDirection={["column", "column", "column"]} px={[4, 0]}>
          <Text fontSize={[32]} lineHeight={1.1} fontWeight="bold">
            Login
          </Text>

          <Box mt={4} display="flex" flexDirection="column" alignItems="center" width="100%">
            <Link href={STREAM_LABS_AUTH} passHref>
              <Button
                width={["100%", "auto"]}
                variant="secondary"
                sx={{ bg: "#72f7c8", color: "black" }}
                mt={2}
              >
                <Text>Streamlabs</Text>
              </Button>
            </Link>
          </Box>
          {/* <Box
            mt={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
          >
            <Button
              disabled
              width={["100%", "auto"]}
              variant="secondary"
              sx={{
                bg: "#466bfd",
                color: "white",
                opacity: 0.3,
                cursor: "default",
              }}
              mt={4}
            >
              <Text>StreamElements</Text>
            </Button>
            <Text fontWeight="normal" mt={1} color="gray">
              Coming soon...
            </Text>
            <Text fontSize={1} fontWeight="normal" mt={1} color="gray">
              (@StreamElements please give me an API key)
            </Text>
          </Box> */}
        </Flex>
      </Box>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { auth_token } = cookie.parse(context.req.headers.cookie || "")

  try {
    if (auth_token) {
      const { username } = getDataFromAuthToken(auth_token)

      if (username) {
        return { props: { user: { isLoggedIn: true, username } } }
      }
    }

    return {
      props: {
        user: {
          isLoggedIn: false,
        },
      },
    }
  } catch (error) {
    return { props: {} }
  }
}
