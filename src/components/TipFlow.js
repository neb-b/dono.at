import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Label, Input, Textarea } from "@rebass/forms/styled-components";
import { Button, Text, Box, Flex } from "rebass/styled-components";

import { getButtonTextColorFromBg } from "util/color";

const QRCode = dynamic(() => import("./QR"), { ssr: false });

export default function Tip({ username, tip_min, color, user }) {
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
  const userColor = color || "#fdaa26";

  async function generateInvoice(isRefresh = false) {
    if (!isRefresh) {
      setInvoiceData(null);
    }

    setLoading(true);
    setExpires(null);
    setExpirationTime(null);

    const { data } = await axios.post("/api/invoice", {
      username,
      amount,
      message,
    });

    setExpires(data.expirationInSec);
    setExpirationTime(data.expirationInSec);
    setInvoiceData(data);
    setLoading(false);
  }

  const refreshInvoice = () => {
    generateInvoice(true);
  };

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
        "Amount must be at least $" + Number(tip_min).toFixed(2)
      );
    } else {
      setTipAmountError(false);
    }

    setAmount(newVal);
  };

  const handleMessage = (newMsg) => {
    if (newMsg.length > 254 - "dono.at - ".length) {
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
    <Box
      sx={{ mx: "auto", maxWidth: invoiceData ? ["500px"] : ["500px"], pb: 4 }}
    >
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
                flexDirection={["column", "column", "row-reverse"]}
              >
                <Box
                  ml={[0, 5]}
                  mt={[3, 0]}
                  sx={{ width: ["100%", "calc(100% - 240px)"] }}
                >
                  <Text fontSize={4}>
                    Tipping{" "}
                    <Text color={color}>${Number(amount).toFixed(2)}</Text>
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

                <Box width={240} height={240} mt={[3, 0]}>
                  <a href={`lightning:${invoiceData.lnInvoice}`}>
                    {expirationTime && (
                      <QRCode
                        color={userColor}
                        expired={isExpired}
                        data={invoiceData.lnInvoice}
                        animationDuration={expirationTime}
                      />
                    )}
                  </a>
                </Box>
              </Flex>

              <Flex mt={[3, 4]} flexDirection={["column", "column", "row"]}>
                {isExpired ? (
                  <Button
                    mt={3}
                    onClick={refreshInvoice}
                    sx={{
                      bg: userColor,
                      color: getButtonTextColorFromBg(userColor),

                      ":hover": {
                        bg: userColor,
                        opacity: 0.9,
                      },
                    }}
                  >
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
                    {copied ? "Copied" : "Copy Invoice"}
                  </Button>
                )}
                <Button
                  ml={[0, 0, 2]}
                  mt={3}
                  onClick={resetInvoice}
                  variant="link"
                >
                  Go Back
                </Button>
              </Flex>
            </>
          )}
          {!invoiceData && (
            <>
              <Box
                maxWidth={["100%", 400]}
                mx="auto"
                as="form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Box>
                  <Label htmlFor="donation_amount">
                    Amount (USD){" "}
                    {tipAmountError && (
                      <Text
                        display="inline-block"
                        color="red"
                        fontWeight="normal"
                        fontSize={2}
                        ml={2}
                      >
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
                      sx={{
                        bg: userColor,
                        color: getButtonTextColorFromBg(userColor),

                        ":hover": {
                          bg: userColor,
                          opacity: 0.9,
                        },
                      }}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                    {user.isLoggedIn && user.username === username && (
                      <Button
                        mt={[3, 0]}
                        ml={[0, "auto"]}
                        variant="outline"
                        button="button"
                        onClick={() =>
                          router.push({
                            pathname: router.query.username,
                          })
                        }
                      >
                        Edit Profile
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
