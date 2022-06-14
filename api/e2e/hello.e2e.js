// Integration testing

const request = require("supertest");
const createApp = require("../src/app");

describe("Test for Hello endpoint", () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(4001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Test for [GET] /", () => {
    test("should return Hello World message", async () => {
      const res = await request(app).get("/");

      expect(res.status).toEqual(200);
      expect(res.text).toEqual("Hello World!");
    });
  });
});
