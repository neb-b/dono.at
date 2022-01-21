import axios from "axios";
import QRCode from "qrcode.react";
import React from "react";
import { Box, Text } from "rebass/styled-components";

function QR({ lnInvoice, invoiceId, expires, handleDonate }) {
  const isExpired = expires <= 0;
  if (!lnInvoice) {
    return null;
  }

  React.useEffect(() => {
    if (!isExpired) {
      let interval = setInterval(() => {
        axios
          .get(`/api/${invoiceId}`)
          .then(({ data }) => {
            if (data.state === "PAID") {
              clearInterval(interval);
              handleDonate();
            }
          })
          .catch((err) => {
            console.error("err", err);
          });
      }, 1000);
    }
  }, [expires, invoiceId, handleDonate, isExpired]);

  return (
    <Box>
      <QRCode size={200} value={lnInvoice} />
      {expires && <Text>Expires in {expires} seconds</Text>}
    </Box>
  );
}

export default QR;
