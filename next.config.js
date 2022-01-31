module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "static-cdn.jtvnw.net",
      "yt3.ggpht.com",
      "platform-lookaside.fbsbx.com",
    ],
  },
  publicRuntimeConfig: {
    BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
  },
};
