import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Box, Flex, Button, Text } from "rebass/styled-components";
import DonationImage from "images/donation.gif";

const StyledLink = styled.a`
  bg: api;
  color: black;
`;

export default function Home() {
  return (
    <Box my={6} maxWidth={800} mx="auto">
      <Flex alignItems="center" flexDirection={["column", "column", "row"]}>
        <Box>
          <Text
            fontSize={64}
            lineHeight={1.1}
            fontWeight="bold"
            maxWidth={[600]}
          >
            Lightning Fast Livestream Donations
          </Text>

          <Button variant="primary" mt={4}>
            <Link href="/cheese__omelette" passHref>
              <Text>View Example Tip Page</Text>
            </Link>
          </Button>
        </Box>
        <Box mt={[4, 4, 0]} pl={2}>
          <Image src={DonationImage} alt="" height={350} width={500} />
        </Box>
      </Flex>
    </Box>
  );
}
