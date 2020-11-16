require("dotenv").config();
import axios from "axios";

module.exports = async (req, res) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/inquiries`,
      {
        email: req.body.email,
        comments: req.body.comments,
      }
    );

    res.send(data);
  } catch (e) {
    res.status(500).send({
      error: "Inquiry failed. Please try again.",
    });
  }
};
