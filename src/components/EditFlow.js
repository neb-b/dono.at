import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Label, Input, Textarea } from "@rebass/forms/styled-components";
import { Button, Text, Box, Link, Flex } from "rebass/styled-components";

import { UserContext } from "pages/_app";

export default function Tip({ username }) {
  const router = useRouter();
  const { user: apiUser, setUser } = React.useContext(UserContext);
  const [strikeUsername, setStrikeUsername] = React.useState("");
  const [tipAmount, setTipAmount] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const apiUserDataStr = JSON.stringify(apiUser);
  React.useEffect(() => {
    const { tip_min, strike_username } = JSON.parse(apiUserDataStr);
    setTipAmount(tip_min);
    if (strike_username) {
      setStrikeUsername(strike_username);
    }
  }, [setTipAmount, setStrikeUsername, apiUserDataStr]);

  async function submitUser() {
    try {
      const { data } = await axios.post("/api/user", {
        username,
        strikeUsername,
        tipAmount,
      });

      setSuccess(true);
      setUser(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Box sx={{ maxWidth: "400px" }}>
      <>
        <Box>
          <Label htmlFor="strike_username">Strike Username</Label>
          <Input
            tx="forms.input"
            variant="normal"
            onChange={(e) => setStrikeUsername(e.target.value)}
            id="strike_username"
            name="strike_username"
            placeholder="Strike Username"
            autocomplete="off"
            value={strikeUsername}
          />
        </Box>
        <Box mt={4}>
          <Label htmlFor="tip_min">Minimum Tip Amount</Label>
          <Input
            tx="forms.input"
            variant="normal"
            onChange={(e) => setTipAmount(e.target.value)}
            id="tip_min"
            name="tip_min"
            placeholder="0.1"
            autocomplete="off"
            value={tipAmount}
          />
        </Box>

        <Box mt={4}>
          <Flex flexDirection={["column", "row"]}>
            <Button onClick={submitUser}>Save</Button>
            <Button
              variant="secondary"
              ml={2}
              mt={[3, 0]}
              onClick={() =>
                router.push({
                  pathname: router.query.username,
                  query: { view: "tip" },
                })
              }
            >
              View as Guest
            </Button>
          </Flex>
          {success && (
            <Box mt={3}>
              <Text>Successfully updated</Text>
            </Box>
          )}
        </Box>
      </>
    </Box>
  );
}
