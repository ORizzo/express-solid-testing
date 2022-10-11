import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { GetBookService } from "../../../services/Book/getBookService";
import { BookRepository } from "../../../repository/bookRepository";
import { AuthorRepository } from "../../../repository/authorRepository";

const mock = {
  authorName: "Mock Author",
  bookName: "Mock Book",
};

beforeAll(async () => {
  const result = await BookRepository.get(mock.bookName);
  if (!result) {
    await BookRepository.create({
      author: mock.authorName,
      bookName: mock.bookName,
    });
  }
});

describe("Get book service unit tests", async () => {
  test("If get book service have an argument should return a specific book", async () => {
    const service = new GetBookService();
    const result = await service.execute(mock.bookName);
    expect(result).toHaveProperty("id");
  });
  test("If get book service do not have an argument should return all books", async () => {
    const length = await BookRepository.getAll().then((books) => {
      return books.length;
    });
    const service = new GetBookService();
    const result = await service.execute();
    expect(result).toHaveLength(length);
  });
});

afterAll(async () => {
  const result = await BookRepository.get(mock.bookName);
  if (result) {
    await AuthorRepository.delete({
      authorName: mock.authorName,
    });
  }
});
