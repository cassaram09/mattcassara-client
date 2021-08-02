require("dotenv").config();

const service = require("@/services/MongoDBService");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Email cannot be empty");
    }

    if (!password) {
      throw new Error("Password cannot be empty");
    }

    await service.connect();

    const { user, token } = await service.loginUser({ email, password });

    res.send({ token, user });
  } catch (e) {
    res.status(400).send({ error: e.message || e });
  }

  service.close();
}

module.exports = login;
