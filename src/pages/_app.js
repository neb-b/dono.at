import { ThemeProvider } from "styled-components";
import { SessionProvider } from "next-auth/react";

import theme from "styles/theme";
import "styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
