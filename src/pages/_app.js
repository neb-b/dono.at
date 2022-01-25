import React from "react";
import { ThemeProvider } from "styled-components";
import { Box } from "rebass/styled-components";
import Header from "components/Header";
import Head from "components/Head";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import theme from "styles/theme";
import "styles/globals.css";

export const UserContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = React.useState({});

  return (
    <UserContext.Provider value={{ setUser, user }}>
      <ThemeProvider theme={theme}>
        <Box px={[4]}>
          <Header />
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
