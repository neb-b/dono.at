module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "static-cdn.jtvnw.net",
      "yt3.ggpht.com",
      "platform-lookaside.fbsbx.com",
      "s3.us-east-2.amazonaws.com",
    ],
  },
  publicRuntimeConfig: {
    BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
  },
};
