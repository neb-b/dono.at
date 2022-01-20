import { Button, Text, Box, Link } from "rebass/styled-components";

export default function Login() {
  const STREAM_LABS_AUTH = `https://streamlabs.com/api/v1.0/authorize?client_id=${process.env.NEXT_PUBLIC_STREAMLABS_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_STREAMLABS_REDIRECT_URI}&scope=donations.create+alerts.create&response_type=code`;

  return (
    <div>
      <Text color="black">Login</Text>
      <Link href={STREAM_LABS_AUTH}>
        <Button variant="primary" mt={2}>
          Login
        </Button>
      </Link>

      <Box variant="card" width={256}>
        Card
        <Box variant="badge">Badge</Box>
      </Box>
    </div>
  );
}
