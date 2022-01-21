import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import { Label, Input, Textarea } from "@rebass/forms";
import { Button, Text, Box, Link, Flex } from "rebass/styled-components";

const QRCode = dynamic(() => import("./QR"), { ssr: false });

export default function Tip({ username }) {
  const [amount, setAmount] = React.useState(0.1);
  const [from, setFrom] = React.useState("satoshi");
  const [message, setMessage] = React.useState("");
  const [invoiceData, setInvoiceData] = React.useState();
  const [expirationTime, setExpirationTime] = React.useState(0);
  const [expires, setExpires] = React.useState();
  const [paid, setPaid] = React.useState(false);
  const invoiceId = invoiceData?.invoiceId;
  const isExpired = expires <= 0;

  async function generateInvoice() {
    const { data } = await axios.post("/api/invoice", { username, amount });
    setExpires(data.expirationInSec);
    setExpirationTime(data.expirationInSec);
    setInvoiceData(data);
  }

  const triggerAlert = React.useCallback(async () => {
    await axios.post("/api/alert", {
      username,
      amount,
      from,
      message,
    });
  }, [username, amount, from, message]);

  React.useEffect(() => {
    let interval;

    function checkStatus() {
      axios
        .get(`/api/${invoiceId}`)
        .then(({ data }) => {
          if (data.state === "PAID") {
            clearInterval(interval);
            setPaid(true);
            triggerAlert();
          }
        })
        .catch((err) => {
          console.error("err", err);
        });
    }

    if (invoiceId && !isExpired) {
      interval = setInterval(() => {
        checkStatus();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [invoiceId, triggerAlert, isExpired]);

  React.useEffect(() => {
    let interval;
    if (expires) {
      interval = setInterval(() => {
        setExpires(expires - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [expires, setExpires]);

  return (
    <Box sx={{ maxWidth: "400px" }}>
      {paid && (
        <Box>
          <Text>Thank you for your tip!</Text>
        </Box>
      )}
      {!paid && (
        <>
          {invoiceData && (
            <Flex alignItems="center">
              {invoiceId && (
                <QRCode
                  expired={isExpired}
                  data={invoiceData.lnInvoice}
                  animationDuration={expirationTime}
                />
              )}
              <Box ml={4}>
                <Text fontWeight="bold">${amount.toFixed(2)}</Text>
                <Text mt={2}>{from}</Text>
                <Text mt={2}>{message}</Text>
              </Box>
            </Flex>
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
                <Button onClick={generateInvoice}>Submit</Button>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
}
