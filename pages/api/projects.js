require("dotenv").config();

var faunadb = require("faunadb");

module.exports = async (req, res) => {
  try {
    const Q = faunadb.query;
    var client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

    var { data } = await client.query(
      Q.Map(Q.Paginate(Q.Match(Q.Index("all_projects"))), (project) =>
        Q.Get(project)
      )
    );

    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }
};
