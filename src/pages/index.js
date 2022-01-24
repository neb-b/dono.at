import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Button, Text } from "rebass/styled-components";
import DonationImage from "images/donation.gif";

export default function Home() {
  return (
    <Box mt={6}>
      <Flex alignItems="center" flexDirection={["column", "row"]}>
        <Box>
          <Text fontSize={72} fontWeight="bold" maxWidth={[600]}>
            Receive Lightning tips live on stream
          </Text>

          <Button variant="primary" mt={4}>
            <Link href="/cheese__omelette">
              <a>View Example Tip Page</a>
            </Link>
          </Button>
        </Box>
        <Box mt={[4, 0]}>
          <Image src={DonationImage} alt="" height={300} width={450} />
        </Box>
      </Flex>
    </Box>
  );
}
