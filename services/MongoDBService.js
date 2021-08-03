const { MongoClient } = require("mongodb");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const axios = require("axios");
class MongoDBService {
  constructor(config = {}) {
    this.config = config;
    this.uri = `mongodb+srv://${config.user}:${config.password}@${config.host}`;

    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return this;
  }

  database() {
    return this.client.db(this.config.database);
  }

  close() {
    return this.client.close();
  }

  async connect() {
    return await this.client.connect();
  }

  formatEntity(entity) {
    const id = entity._id.toHexString();
    delete entity._id;
    return { ...entity, id };
  }

  async loginUser({ email, password }) {
    const user = await this.findUser(email);

    if (!user) {
      throw new Error("User does not exist");
    }

    const token = this.validatePassword({ user, password });

    if (!token) {
      throw new Error("Incorrect password");
    }

    return { user, token };
  }

  async findUser(email) {
    const db = this.database();
    const user = await db.collection("users").findOne({ email });
    return user ? this.formatEntity(user) : null;
  }

  validatePassword({ user, password }) {
    let hash = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex")
      .toUpperCase();

    if (hash === user.password) {
      delete user.password;
      return jwt.sign(user, this.config.userSecret, {
        expiresIn: "24h",
      });
    }
    return null;
  }

  async validateRequest(token) {
    return new Promise((resolve, reject) => {
      if (!token) {
        return reject("You must be logged in to perform this action.");
      }

      jwt.verify(token, this.config.userSecret, (error, decoded) => {
        error ? reject(error) : resolve(decoded);
      });
    });
  }
}

module.exports = new MongoDBService({
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  host: process.env.MONGODB_HOST,
  database: process.env.MONGODB_DATABASE,
  userSecret: process.env.USER_SECRET,
});
