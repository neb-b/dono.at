import React from "react";
import { Box } from "rebass/styled-components";
import Header from "components/Header";

export default function Layout({ color, user, children }) {
  return (
    <Box>
      <Header color={color} user={user} />
      {children}
    </Box>
  );
}
