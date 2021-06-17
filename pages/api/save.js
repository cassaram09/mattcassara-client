require("dotenv").config();

var faunadb = require("faunadb");

module.exports = async (req, res) => {
  try {
    const Q = faunadb.query;
    var client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

    var ress = await client.query(
      Q.Update(Q.Ref(Q.Collection("pages"), req.body.ref), {
        data: {
          ...req.body.data,
        },
      })
    );

    res.send(ress);
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }
};
