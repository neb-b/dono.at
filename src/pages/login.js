import { Button, Text, Box, Link } from "rebass/styled-components";

import { useSession, signIn, signOut } from "next-auth/react";
import router, { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession();

  const STREAM_LABS_AUTH = `https://streamlabs.com/api/v1.0/authorize?client_id=${process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI}&scope=donations.create+alerts.create&response_type=code`;

  console.log("session", session);
  return (
    <div>
      <Link href={STREAM_LABS_AUTH}>
        <Button
          variant="primary"
          mt={2}
          onClick={() =>
            router.push({
              pathname: router.pathname,
              query: { ...router.query, type: "streamlabs" },
            })
          }
        >
          Login with Streamlabs
        </Button>
      </Link>
    </div>
  );
}
