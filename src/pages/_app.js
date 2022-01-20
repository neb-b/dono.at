import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

//https://streamlabs.com/api/v1.0/authorize?client_id=SVpUMB1Vz6l2lX6Pi3B8O07px3Hva1Ha9ueJP3Zq&redirect_uri=https://streamlabs-ln-donations.vercel.app/oauth/streamlabs&scope=scope=donations.create+alerts.create&response_type=code
