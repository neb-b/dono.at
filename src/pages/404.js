import React from "react";
import Link from "next/link";
import { Text, Box, Flex } from "rebass/styled-components";
import Layout from "components/Layout";

export default function TipPage() {
  return (
    <Layout>
      <Box sx={{ mx: "auto", maxWidth: "500px", pb: 4 }} mt={[5, 5]}>
        <Text fontSize={32}>User not found</Text>
        <Text fontWeight="normal" mt={3}>
          Consider donating to the{" "}
          <Link href="https://strike.me/hrf" passHref>
            <Text
              display="inline-block"
              color="api"
              sx={{
                ":hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              Human Rights Foundation
            </Text>
          </Link>
        </Text>
      </Box>
    </Layout>
  );
}
