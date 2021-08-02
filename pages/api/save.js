require("dotenv").config();
const service = require("@/services/MongoDBService");

async function save(req, res) {
  try {
    await service.connect();

    await service.validateRequest(req.headers["x-login-token"]);

    const db = service.database();
    const collection = db.collection("pages");

    const updateResult = await collection.updateOne(
      { path: req.body.path },
      { $set: req.body.data }
    );

    if (updateResult.modifiedCount === 1) {
      res.send(req.body.data);
    } else {
      res.send({ save: false });
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }

  service.close();
}

module.exports = save;
