import {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} from "simple-oauth2";

const config = {
  client: {
    id: process.env.STREAMLABS_CLIENT_ID,
    secret: process.env.STREAMLABS_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://streamlabs.com/api/v1.0",
  },
};

const client = new AuthorizationCode(config);
