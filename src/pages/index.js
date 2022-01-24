import Link from "next/link";
import { Box, Button, Text } from "rebass/styled-components";

export default function Home() {
  return (
    <Box mt={6}>
      <Text fontSize={72} fontWeight="bold" maxWidth={[600]}>
        Receive Lightning tips live on stream
      </Text>

      <Link href="/cheese__omelette">
        <Button variant="primary" mt={4}>
          View Example Tip Page
        </Button>
      </Link>
    </Box>
  );
}
