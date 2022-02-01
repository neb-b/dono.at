import React from "react";

import * as cookie from "cookie";
import Link from "next/link";
import { Text, Box, Flex, Button } from "rebass/styled-components";
import Layout from "components/Layout";

import { getUserFromAuthToken, getStats } from "../lib/db";

export default function TipPage({ user, stats }) {
  const [mode, setMode] = React.useState("donations");

  return (
    <Layout user={user}>
      <Box sx={{ mx: "auto", maxWidth: ["100%", "400px"], pb: 4 }} mt={[5, 5]}>
        <Text fontSize={32}>Stats</Text>
        <Box width="100%" height="1px" bg="gray18" mt={3} />

        {stats && (
          <>
            <Flex justifyContent="space-between" mt={3} fontSize={24}>
              <Text>Total donated: </Text>
              <Text display="inline-block" color="secondary">
                ${stats.totalAmount}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mt={3} fontSize={24}>
              <Text>Total donations: </Text>
              <Text display="inline-block" color="secondary">
                {stats.totalTxs}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mt={3} fontSize={24}>
              <Text>Total users: </Text>
              <Text display="inline-block" color="secondary">
                {stats.users.length}
              </Text>
            </Flex>

            <Box mt={4}>
              <Flex>
                <Button
                  onClick={() => setMode("donations")}
                  variant={mode === "donations" ? "primary" : "link"}
                >
                  Donations
                </Button>
                <Button
                  onClick={() => setMode("users")}
                  ml={2}
                  variant={mode === "users" ? "primary" : "link"}
                >
                  Users
                </Button>
              </Flex>
              {mode === "users" &&
                stats.users.map((user, index) => (
                  <Box
                    key={user.username}
                    mt={index === 0 ? 4 : 4}
                    sx={{ border: "1px solid gray18" }}
                  >
                    <Link href={`/${user.username}`} passHref>
                      <Text
                        fontWeight="normal"
                        mt={2}
                        sx={{
                          cursor: "pointer",
                          color: user.color,
                          ":hover": { color: "secondary" },
                        }}
                      >
                        {user.username}
                      </Text>
                    </Link>
                  </Box>
                ))}
              {mode === "donations" &&
                stats.txs.map((tx, index) => (
                  <Box
                    key={tx.id}
                    mt={index === 0 ? 4 : 4}
                    sx={{ border: "1px solid gray18" }}
                  >
                    <Text display="inline-block" mr={2}>
                      ${tx.amount}{" "}
                      <Text display="inline-block" fontWeight="normal">
                        {tx.from ? (
                          <>
                            from <Text display="inline-block">{tx.from}</Text>{" "}
                            to{" "}
                          </>
                        ) : (
                          ""
                        )}
                      </Text>{" "}
                      {tx.usrname}
                    </Text>
                    <Text color="primary" display="inline-block">
                      {tx.username}
                    </Text>
                    <Text fontWeight="normal" mt={2}>
                      {tx.message}
                    </Text>
                  </Box>
                ))}
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { auth_token } = cookie.parse(context.req.headers.cookie || "");

  try {
    const user = await getUserFromAuthToken(auth_token);
    if (!user || user.username !== "cheese__omelette") {
    }

    const stats = await getStats();

    return {
      props: {
        user: { ...user, isLoggedIn: true },
        stats: stats,
      },
    };
  } catch (e) {
    return { props: {} };
    // return {
    //   redirect: {
    //     destination: `/`,
    //     permanent: false,
    //   },
    // };
  }
}
