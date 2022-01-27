import NextHead from "next/head";

const Head = (props) => {
  return (
    <NextHead>
      <title>
        {process.env.NODE_ENV === "development" ? "DEV - " : ""}dono.at
      </title>
      <meta property="og:image" content="https://dono.at/assets/og.png" />
      <meta
        property="og:description"
        content="Receive Bitcoin donations with Streamlabs alerts"
      />
      <meta property="og:type" content="website" />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </NextHead>
  );
};

export default Head;
