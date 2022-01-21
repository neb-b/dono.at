import { getInvoice } from "../../lib/strike";

const handler = async (req, res) => {
  const { invoiceId } = req.query;

  try {
    const data = await getInvoice(invoiceId);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
};

export default handler;
