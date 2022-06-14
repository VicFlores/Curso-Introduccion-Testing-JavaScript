// End to End testing

const { MongoClient } = require("mongodb");
const request = require("supertest");
const createApp = require("../src/app");
const { config } = require("../src/config");

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe("Test for Books", () => {
  let app = null;
  let server = null;
  let database = null;
  let client = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(4001);
    client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.dropDatabase();
    await client.close();
  });

  describe("Test for [GET] /api/v1/books", () => {
    test("should return a list books", async () => {
      const seedData = await database.collection("books").insertMany([
        {
          name: "Book 1",
          price: 45,
        },
        {
          name: "Book 2",
          price: 12,
        },
      ]);

      console.log(seedData);

      const res = await request(app).get("/api/v1/books");

      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(seedData.insertedCount);
    });
  });
});
