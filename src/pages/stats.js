import React from "react";

import * as cookie from "cookie";
import { Text, Box, Flex } from "rebass/styled-components";
import Layout from "components/Layout";

import { getUserFromAuthToken, getStats } from "../lib/db";

export default function TipPage({ user, stats }) {
  return (
    <Layout user={user}>
      <Box sx={{ mx: "auto", maxWidth: ["100%", "350px"], pb: 4 }} mt={[5, 5]}>
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
                {stats.totalUsers}
              </Text>
            </Flex>

            <Box mt={3}>
              {stats.txs.map((tx, index) => (
                <Box
                  key={tx.id}
                  mt={index === 0 ? 4 : 4}
                  sx={{ border: "1px solid gray18" }}
                >
                  <Flex alignItems="center">
                    <Text>
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
                    <Text ml={2} color="primary">
                      {tx.username}
                    </Text>
                  </Flex>
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
    console.log("error", e);
    return { props: {} };
    // return {
    //   redirect: {
    //     destination: `/`,
    //     permanent: false,
    //   },
    // };
  }
}
