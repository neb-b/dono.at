import Link from "next/link";
import styled from "styled-components";
import { Box, Flex, Button, Text } from "rebass/styled-components";

export default function Home() {
  return (
    <Box my={6} maxWidth={800} mx="auto">
      <Flex alignItems="center" flexDirection={["column", "column", "column"]}>
        <Box>
          <Text fontSize={[48, 64]} lineHeight={1.1} fontWeight="bold">
            Lightning Fast Livestream Donations
          </Text>

          <Link href="/cheese__omelette" passHref>
            <Button variant="primary" mt={4}>
              <Text display={["none", "block"]}>
                View Example Donation Page
              </Text>
              <Text display={["block", "none"]}>View Example Page</Text>
            </Button>
          </Link>
        </Box>
        <Flex
          alignItems={["flex-start", "flex-start", "center"]}
          justifyContent="space-between"
          mt={4}
          flexDirection={["column", "column", "row"]}
        >
          <Box
            mt={[4, 4, 5]}
            border="1px solid red"
            pl={2}
            flexBasis={"50%"}
            flexGrow={0}
          >
            <Box
              as="video"
              width={["100%", 400]}
              autoPlay
              noControls
              loop
              muted
            >
              <source src="/assets/donation.mp4#t=0.1" type="video/mp4" />
            </Box>
          </Box>
          <Box flexBasis={"50%"} flexGrow={0} ml={3} mt={[5, 4]}>
            <Text fontSize={32} fontWeight="bold" color="secondary">
              <Text display="inline-block" color="secondary">
                Instant
              </Text>{" "}
              <Text display="inline-block" color="secondary">
                Bitcoin
              </Text>
              <br />
              Donation Alerts
            </Text>
            <Text fontSize={24} mt={3} fontWeight="normal">
              Receive Bitcoin donations and convert them to $USD instantly.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
