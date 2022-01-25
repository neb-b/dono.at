import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Label, Input, Textarea } from "@rebass/forms/styled-components";
import { Button, Text, Box, Link, Flex } from "rebass/styled-components";

const QRCode = dynamic(() => import("./QR"), { ssr: false });

export default function Tip({ username, tip_min, isLoggedIn }) {
  const router = useRouter();
  const [amount, setAmount] = React.useState(tip_min);
  const [tipAmountError, setTipAmountError] = React.useState(false);
  const [from, setFrom] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [msgError, setMsgError] = React.useState(false);
  const [invoiceData, setInvoiceData] = React.useState();
  const [expirationTime, setExpirationTime] = React.useState(0);
  const [expires, setExpires] = React.useState();
  const [paid, setPaid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const invoiceId = invoiceData?.invoiceId;
  const isExpired = expires <= 0;

  async function generateInvoice() {
    setInvoiceData(null);
    setLoading(true);
    const { data } = await axios.post("/api/invoice", {
      username,
      amount,
    });
    setExpires(data.expirationInSec);
    setExpirationTime(data.expirationInSec);
    setInvoiceData(data);
    setLoading(false);
  }

  const resetInvoice = () => {
    setInvoiceData(null);
    setExpires(null);
    setExpirationTime(null);
  };

  const triggerAlert = React.useCallback(async () => {
    await axios.post("/api/alert", {
      username,
      amount,
      from: from || "Anonymous",
      message,
    });
  }, [username, amount, from, message]);

  const handleTipAmount = (newVal) => {
    if (newVal < tip_min) {
      setTipAmountError(
        "Tip amount must be at least $" + Number(tip_min).toFixed(2)
      );
    } else {
      setTipAmountError(false);
    }

    setAmount(newVal);
  };

  const handleMessage = (newMsg) => {
    if (newMsg.length > 254) {
      setMsgError("Maximum message length reached");
      return;
    }

    setMessage(newMsg);
  };

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
    <Box sx={{ maxWidth: "500px", pb: 4 }}>
      {paid && (
        <Box>
          <Text>Thank you for your tip!</Text>
        </Box>
      )}
      {!paid && (
        <>
          {invoiceData && (
            <>
              <Flex
                alignItems={["flex-start", "center"]}
                flexDirection={["column", "row"]}
              >
                <Box>
                  <a href={`lightning:${invoiceData.lnInvoice}`}>
                    <QRCode
                      expired={isExpired}
                      data={invoiceData.lnInvoice}
                      animationDuration={expirationTime}
                    />
                  </a>
                </Box>
                <Box ml={[0, 4]} mt={[4, 0]}>
                  <Text fontSize={4}>
                    Tipping{" "}
                    <Text color="api">${Number(amount).toFixed(2)}</Text>
                  </Text>
                  <Text mt={2} fontSize={3}>
                    From <Text fontWeight="normal">{from || "Anonymous"}</Text>
                  </Text>
                  {message && (
                    <>
                      <Text mt={3}>Message</Text>
                      <Text mt={2} fontWeight="normal">
                        {message}
                      </Text>
                    </>
                  )}
                </Box>
              </Flex>

              {isExpired ? (
                <Button mt={3} onClick={generateInvoice}>
                  Refresh
                </Button>
              ) : (
                <Button
                  mt={3}
                  onClick={() => {
                    navigator.clipboard.writeText(invoiceData.lnInvoice);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1000);
                  }}
                  variant="link"
                >
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
              <Button ml={2} mt={3} onClick={resetInvoice} variant="link">
                Go Back
              </Button>
            </>
          )}
          {!invoiceData && (
            <>
              <Box as="form" onSubmit={generateInvoice}>
                <Box>
                  <Label htmlFor="donation_amount">
                    Amount{" "}
                    {tipAmountError && (
                      <Text color="red" fontWeight="normal" fontSize={2} ml={2}>
                        {tipAmountError}
                      </Text>
                    )}
                  </Label>
                  <Input
                    disabled={loading}
                    tx="forms.input"
                    variant="normal"
                    onChange={(e) => handleTipAmount(e.target.value)}
                    name="donation_amount"
                    placeholder="1.23"
                    autocomplete="off"
                    value={amount}
                  />
                </Box>
                <Box mt={3}>
                  <Label htmlFor="donation_from">From</Label>
                  <Input
                    disabled={loading}
                    tx="forms.input"
                    variant="normal"
                    onChange={(e) => setFrom(e.target.value)}
                    name="donation_from"
                    placeholder="satoshi"
                    autocomplete="off"
                    value={from}
                  />
                </Box>
                <Box mt={3}>
                  <Label htmlFor="donation_message">
                    Message{" "}
                    {msgError && (
                      <Text color="red" fontWeight="normal" fontSize={2} ml={2}>
                        {msgError}
                      </Text>
                    )}
                  </Label>
                  <Textarea
                    disabled={loading}
                    onChange={(e) => handleMessage(e.target.value)}
                    name="donation_message"
                    placeholder="Hello"
                    autocomplete="off"
                    value={message}
                  />
                </Box>

                <Box mt={3}>
                  <Flex flexDirection={["column", "row"]}>
                    <Button
                      type="submit"
                      disabled={loading}
                      onClick={generateInvoice}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                    {isLoggedIn && (
                      <Button
                        mt={[3, 0]}
                        variant="secondary"
                        ml={2}
                        onClick={() =>
                          router.push({
                            pathname: router.query.username,
                            query: {},
                          })
                        }
                      >
                        Edit Your Info
                      </Button>
                    )}
                  </Flex>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
}
