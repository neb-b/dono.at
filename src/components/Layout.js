import React from "react";
import { Box } from "rebass/styled-components";
import Header from "components/Header";
import { useRouter } from "next/router";
import ReactGA from "react-ga";

export default function Layout({ color, user, children }) {
  const { asPath } = useRouter();

  React.useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
  }, []);

  React.useEffect(() => {
    ReactGA.pageview(asPath);
  }, [asPath]);

  return (
    <Box>
      <Header color={color} user={user} />
      {children}
    </Box>
  );
}
