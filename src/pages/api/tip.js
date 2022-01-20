import axios from "axios";

// const HANDLE = "your_strike_handle";
// const PARTNER_API_URL = "https://api.strike.me/v1.0";
// const PARTNER_API_TOKEN = "xxxx";
// ​
// const apiInstance = axios.create({
//   baseURL: PARTNER_API_URL,
//   timeout: 5000,
//   headers: {
//     Authorization: `Bearer ${PARTNER_API_TOKEN}`,
//     "Content-Type": "application/json",
//   },
// });
// ​
// function handleError(error, res) {
//   if (error.response) {
//     const requestedUrl = `${error.response.config.baseURL}${error.response.config.url}`;
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     if (requestedUrl) {
//       console.log(`error fetching: ${requestedUrl}`);
//     }
//     console.log(`returned: ${error.response.status}`);
// ​
//     const validationErrors = error.response.data?.data?.validationErrors;
//     if (validationErrors) {
//       Object.values(validationErrors).forEach((validationError) => {
//         console.log(`validationError: ${validationError[0].message}`);
//       });
//     }
// ​
//     res.status(error.response.status).json(error.response.data);
//   } else if (error.request) {
//     // The request was made but no response was received
//     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//     // http.ClientRequest in node.js
//     console.log(error);
//     res.status(400).json();
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log(error.message);
//     res.status(error.status || 500).json();
//   }
// }
​
async function apiRouteHandler(req, res) {
//   const {
//     body: { amount },
//   } = req;
// ​
//   try {
//     const {
//       data: { invoiceId },
//     } = await apiInstance.post(`/invoices/handle/${HANDLE}`, {
//       amount: { amount, currency: "USD" },
//     });
// ​
//     const { data } = await apiInstance.post(`/invoices/${invoiceId}/quote`);
//     const responsePayload = {
//       invoiceId,
//       ...data,
//     };
// ​
//     res.status(200).json(responsePayload);
//   } catch (error) {
//     handleError(error, res);
//   }
}
​
export default apiRouteHandler;