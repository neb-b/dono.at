import { fetchUser } from "../../../lib/strike";

const handler = async (req, res) => {
  const { username } = req.query;

  try {
    const data = await fetchUser({ username });
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
};

export default handler;
