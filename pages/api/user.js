require("dotenv").config();
const service = require("@/services/MongoDBService");

async function save(req, res) {
  try {
    await service.connect();

    const decoded = await service.validateRequest(req.headers["x-login-token"]);

    const user = await service.findUser(decoded.email);

    res.send(user);
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }

  service.close();
}

module.exports = save;
