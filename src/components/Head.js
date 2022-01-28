import NextHead from "next/head";
import Script from "next/script";

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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="dono.at" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />

      <Script
        id="gtag-script"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
              window.gtag = gtag
            `,
        }}
      />
    </NextHead>
  );
};

export default Head;
