import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import { Label, Input, Textarea } from "@rebass/forms";
import { Button, Text, Box, Link, Flex } from "rebass/styled-components";

const QRCode = dynamic(() => import("./QR"), { ssr: false });

export default function Tip({ username }) {
  const [amount, setAmount] = React.useState();
  const [tipAmount, setTipAmount] = React.useState("");

  async function generateInvoice() {}

  return (
    <Box sx={{ maxWidth: "400px" }}>
      <>
        <Box>
          <Label htmlFor="strike_username">Strike Username</Label>
          <Input
            onChange={(e) => setAmount(e.target.value)}
            id="strike_username"
            name="strike_username"
            placeholder="Strike Username"
            fontSize={5}
            autocomplete="off"
            value={amount}
          />
        </Box>
        <Box mt={3}>
          <Label htmlFor="donation_from">Minimum Tip Amount</Label>
          <Input
            onChange={(e) => setTipAmount(e.target.value)}
            id="donation_from"
            name="donation_from"
            placeholder="0.1"
            fontSize={4}
            autocomplete="off"
            value={tipAmount}
          />
        </Box>

        <Box mt={3}>
          <Button onClick={generateInvoice}>Submit</Button>
        </Box>
      </>
    </Box>
  );
}
