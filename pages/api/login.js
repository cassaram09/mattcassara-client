require("dotenv").config();

var faunadb = require("faunadb");

module.exports = async (req, res) => {
  try {
    const Q = faunadb.query;
    var client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

    const user = await client.query(
      Q.Login(Q.Match(Q.Index("users_by_email"), req.body.email), {
        password: req.body.password,
      })
    );

    res.send({ token: user.secret });
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }
};
