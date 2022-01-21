import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { createOrUpdateUser } from "../lib/db";

const options = {
  //   callbacks: {
  //     async jwt(token, user, account, profile, isNewUser) {
  //       // Add additional session params
  //       if (user?.id) {
  //         token.id = user.id;
  //       }
  //       // XXX We need to update the user name incase they update it ... kind of hacky
  //       // better if we use user id everywhere an ignore the username ...
  //       if (token?.id) {
  //         const { name } = await prisma.user.findUnique({
  //           where: { id: token.id },
  //         });
  //         token.name = name;
  //       }
  //       return token;
  //     },
  //     async session(session, token) {
  //       // we need to add additional session params here
  //       session.user.id = token.id;
  //       session.user.name = token.name;
  //       return session;
  //     },
  //   },
  providers: [
    Providers.Credentials({
      name: "Streamlabs",
      credentials: {
        code: { label: "code", type: "text" },
      },
      async authorize(credentials, req) {
        console.log("???", credentials);
        const { code } = credentials;
        // const access_token = "SbBk6oPNQidxDMQj795sS8FUWvapqgTMDD7HwaPd";

        try {
          const {
            data: { access_token },
          } = await axios.post(`https://streamlabs.com/api/v1.0/token`, {
            grant_type: "authorization_code",
            client_id: process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID,
            client_secret: process.env.STREAMLABS_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI,
            code,
          });

          const {
            data,
            data: { streamlabs },
          } = await axios.get(
            `https://streamlabs.com/api/v1.0/user?access_token=${access_token}`
          );

          console.log("data", data);
          const user = await createOrUpdateUser({
            ...streamlabs,
            access_token,
          });
          return { username: "test" };
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.NEXTAUTH_SECRET,
  session: { jwt: true },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  pages: {
    signIn: "/login",
  },
};

export default (req, res) => NextAuth(req, res, options);
