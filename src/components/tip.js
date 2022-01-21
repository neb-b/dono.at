import React from "react";
import axios from "axios";
import { Label, Input, Textarea } from "@rebass/forms";
import { Button, Text, Box, Link } from "rebass/styled-components";
import QR from "./QR";

export default function Tip({ username }) {
  const [amount, setAmount] = React.useState(0.1);
  const [from, setFrom] = React.useState("satoshi");
  const [message, setMessage] = React.useState("");
  const [invoiceData, setInvoiceData] = React.useState();
  const [expires, setExpires] = React.useState();

  async function handleSubmit() {
    const { data } = await axios.post("/api/invoice", { username, amount });
    console.log("data", data);
    setExpires(data.expirationInSec);
    setInvoiceData(data);
  }

  async function handleDonate() {
    const { data } = await axios.post("/api/alert", {
      username,
      amount,
      from,
      message,
    });
    console.log("data", data);
    setExpires(data.expirationInSec);
    setInvoiceData(data);
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setExpires(expires - 1);
    }, 1000);
    // clearing interval
    return () => clearInterval(timer);
  }, [expires]);

  return (
    <Box sx={{ maxWidth: "200px" }}>
      {invoiceData && (
        <Box>
          <Text>{amount}</Text>
          <Text>{from}</Text>
          <Text>{message}</Text>
          <QR {...invoiceData} expires={expires} handleDonate={handleDonate} />
        </Box>
      )}
      {!invoiceData && (
        <>
          <Box>
            <Label htmlFor="donation_amount">Amount</Label>
            <Input
              onChange={(e) => setAmount(e.target.value)}
              id="donation_amount"
              name="donation_amount"
              placeholder="1.23"
              fontSize={5}
              autocomplete="off"
              value={amount}
            />
          </Box>
          <Box mt={3}>
            <Label htmlFor="donation_from">From</Label>
            <Input
              onChange={(e) => setFrom(e.target.value)}
              id="donation_from"
              name="donation_from"
              placeholder="satoshi"
              fontSize={4}
              autocomplete="off"
              value={from}
            />
          </Box>
          <Box mt={3}>
            <Label htmlFor="donation_message">Message</Label>
            <Textarea
              onChange={(e) => setMessage(e.target.value)}
              id="donation_message"
              name="donation_message"
              placeholder="Hello"
              fontSize={4}
              autocomplete="off"
            />
          </Box>

          <Box mt={3}>
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </>
      )}
    </Box>
  );
}
