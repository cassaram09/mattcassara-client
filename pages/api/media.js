require("dotenv").config();
const service = require("@/services/MongoDBService");
const AWS = require("aws-sdk");
const nextConnect = require("next-connect");
const multer = require("multer");
const bodyParser = require("body-parser");

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: "us-east-1",
});

const S3_BUCKET = process.env.AWS_S3_BUCKET;

const MEDIA = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

async function uploadToS3(data) {
  return new Promise((resolve, reject) => {
    const { buffer: Body, mimetype: ContentType, originalname } = data;

    const [basename, extension] = originalname.split(".");
    const Key = `${basename.replace(
      /[^A-z0-9_]/g,
      ""
    )}-${Date.now()}.${extension}`;

    S3.putObject(
      {
        Body,
        Bucket: S3_BUCKET,
        ContentType,
        Key,
        ACL: "public-read",
        CacheControl: "public,max-age=604800",
      },
      (error, data) => {
        error
          ? reject(error)
          : resolve({
              src: `https://s3.amazonaws.com/${S3_BUCKET}/${Key}`,
              key: Key,
              alt: "",
            });
      }
    );
  });
}

async function deleteMedia(id) {
  return new Promise((resolve, reject) => {
    var params = { Bucket: S3_BUCKET, Key: id };

    S3.deleteObject(params, function (error, data) {
      error ? reject(error) : resolve({ s3_delete: true });
    });
  });
}

async function saveMedia(image) {
  const db = service.database();
  const collection = db.collection("assets");

  const insertResult = await collection.insertOne(image);

  return insertResult;
}

MEDIA.use((req, res, next) => {
  const upload = multer({ storage: multer.memoryStorage() });

  upload.single("file")(req, {}, (err) => {
    next();
  });
});

MEDIA.post(async (req, res) => {
  try {
    await service.connect();
    await service.validateRequest(req.headers["x-login-token"]);

    const image = await uploadToS3(req.file);
    const media = await saveMedia(image);
    if (media.acknowledged) {
      res.send(image);
    } else {
      throw new Error("Not saved to db");
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }

  service.close();
});

MEDIA.get(async (req, res) => {
  try {
    await service.connect();

    const db = service.database();
    const collection = db.collection("assets");
    const findResult = await collection.find({}).toArray();

    res.send(findResult.map((entity) => service.formatEntity(entity)));
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }

  service.close();
});

MEDIA.patch(bodyParser.json(), async (req, res) => {
  try {
    await service.connect();
    await service.validateRequest(req.headers["x-login-token"]);

    const db = service.database();
    const collection = db.collection("assets");
    const updateResult = await collection.updateOne(
      { key: req.body.key },
      { $set: { alt: req.body.alt } }
    );

    if (updateResult.modifiedCount === 1) {
      res.send(req.body);
    } else {
      res.send({ save: false });
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }

  service.close();
});

MEDIA.delete(async (req, res) => {
  try {
    await service.connect();
    await service.validateRequest(req.headers["x-login-token"]);

    const db = service.database();
    const collection = db.collection("assets");
    const result = await collection.deleteOne({
      key: req.query.key,
    });
    const s3Result = await deleteMedia(req.query.key);

    res.send({ ...s3Result, ...result });
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message || e });
  }

  service.close();
});

export default MEDIA;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
