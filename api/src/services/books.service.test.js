const { generateManyBook } = require("../fakes/books.fake");
const BooksService = require("./books.service");

const mockGetAll = jest.fn();

jest.mock("../lib/mongo.lib.js", () =>
  jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => {},
  }))
);

describe("Test for book service", () => {
  let service;

  beforeEach(() => {
    service = new BooksService();
    jest.clearAllMocks();
  });

  describe("test for get books", () => {
    test("return list of books", async () => {
      // Arange
      const fakeBooks = generateManyBook(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledWith("books", {});
      expect(mockGetAll).toHaveBeenCalledTimes(1);
    });

    test("return a name of book", async () => {
      // Arange
      const fakeBooks = generateManyBook(4);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });
  });
});
