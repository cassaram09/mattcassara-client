require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@dsb-cluster-01.ifbzc.mongodb.net`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);
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

    client.close();
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }
};
