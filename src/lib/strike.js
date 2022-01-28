import axios from "axios";
import { logError } from "lib/log";

const api = axios.create({
  baseURL: process.env.STRIKE_API_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${process.env.STRIKE_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function createInvoice({
  amount,
  username,
  streamer_username,
  message,
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { invoiceId },
      } = await api.post(`/invoices/handle/${username}`, {
        amount: { currency: "USD", amount },
        description: `dono.at - ${message}`,
      });

      const { data } = await api.post(`/invoices/${invoiceId}/quote`);

      const responsePayload = {
        invoiceId,
        ...data,
      };
      resolve(responsePayload);
    } catch (error) {
      logError(error);
      reject(error);
    }
  });
}
export async function getInvoice(invoiceId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.get(`/invoices/${invoiceId}`);

      resolve(data);
    } catch (error) {
      logError(error);
      reject(error);
    }
  });
}
