import React from "react";
import { ThemeProvider } from "styled-components";
import { Flex, Box } from "rebass/styled-components";
import Head from "components/Head";
import Script from "next/script";
import Footer from "components/Footer";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import theme from "styles/theme";
import "styles/globals.css";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

export const UserContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [contextUser, setContextUser] = React.useState({});
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <UserContext.Provider value={{ contextUser, setContextUser }}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head />
      <ThemeProvider theme={theme}>
        <Flex flexDirection="column" minHeight="100vh">
          <Box px={[4]}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Flex>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
