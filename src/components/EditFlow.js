import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Checkmark from "components/CheckIcon";
import Copy from "components/CopyIcon";
import { Label, Input, Textarea } from "@rebass/forms/styled-components";
import { Button, Text, Box, Link, Flex } from "rebass/styled-components";

import { UserContext } from "pages/_app";

export default function Tip({ username }) {
  const router = useRouter();
  const copyRef = React.createRef();
  const { user: apiUser, setUser } = React.useContext(UserContext);
  const [strikeUsername, setStrikeUsername] = React.useState("");
  const [tipAmount, setTipAmount] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [showCheckMark, setShowCheckMark] = React.useState(false);
  const donoLink = `https://dono.at/${username}`;

  const apiUserDataStr = JSON.stringify(apiUser);
  React.useEffect(() => {
    const { tip_min, strike_username } = JSON.parse(apiUserDataStr);
    setTipAmount(tip_min);
    if (strike_username) {
      setStrikeUsername(strike_username);
    }
  }, [setTipAmount, setStrikeUsername, apiUserDataStr]);

  const handleCopy = () => {
    copyRef.current.select();
    navigator.clipboard.writeText(donoLink);

    setShowCheckMark(true);
    setTimeout(() => {
      setShowCheckMark(false);
    }, 1500);
  };

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
    <Box pb={5} maxWidth={460} mx="auto">
      <>
        <Box maxWidth={460} mx="auto">
          <Label htmlFor="dono_link">Your Dono Link</Label>
          <Flex>
            <Input
              ref={copyRef}
              tx="forms.input"
              variant="normal"
              id="dono_link"
              name="dono_link"
              placeholder="Strike Username"
              autocomplete="off"
              value={donoLink}
              disabled
              sx={{
                border: "1px dashed white",
                backgroundColor: "black !important",
                opacity: `1 !important`,
              }}
            />
            <Button
              ml={2}
              px={"32px"}
              variant="secondary"
              onClick={handleCopy}
              sx={{
                svg: {
                  ml: -1,
                },
              }}
            >
              {showCheckMark ? (
                <Checkmark height={24} width={24} />
              ) : (
                <Copy height={24} width={24} />
              )}
            </Button>
          </Flex>
        </Box>
        <Box mt={4}>
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
              variant="outline"
              ml={["0", "auto"]}
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
              <Text fontWeight="normal">Successfully updated!</Text>
            </Box>
          )}
        </Box>
      </>
    </Box>
  );
}
