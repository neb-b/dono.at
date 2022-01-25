import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text, Box, Flex } from "rebass/styled-components";

export default function TipPage() {
  return (
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
  );
}
