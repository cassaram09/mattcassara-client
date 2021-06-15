require("dotenv").config();

var faunadb = require("faunadb");

module.exports = async (req, res) => {
  try {
    const Q = faunadb.query;
    var client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

    var { data } = await client.query(
      Q.Map(
        Q.Paginate(Q.Match(Q.Index(req.body.index), req.body.path)),
        (page) => Q.Get(page)
      )
    );

    res.send(req.body.single ? data[0] : data);
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }
};
