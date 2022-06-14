// Integration testing

const mockGetAll = jest.fn();
const request = require("supertest");
const createApp = require("../src/app");
const { generateManyBook } = require("../src/fakes/books.fake");

jest.mock("../src/lib/mongo.lib.js", () =>
  jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => {},
  }))
);

describe("Test for Books", () => {
  let app = null;
  let server = null;

  beforeAll(() => {
    app = createApp();
    server = app.listen(4001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Test for [GET] /api/v1/books", () => {
    test("should return a list books", async () => {
      const fakeBooks = generateManyBook(5);
      mockGetAll.mockResolvedValue(fakeBooks);
      const res = await request(app).get("/api/v1/books");

      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(fakeBooks.length);
    });
  });
});
