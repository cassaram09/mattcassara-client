require("dotenv").config();
const service = require("@/services/MongoDBService");

module.exports = async (req, res) => {
  try {
    await service.connect();
    const db = service.database();
    const collection = db.collection("pages");

    const findResult = await collection.find({}).toArray();

    res.send(findResult);

    service.close();
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }
};
