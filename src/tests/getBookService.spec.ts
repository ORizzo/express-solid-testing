import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { GetBookService } from "../services/getBookService";
import { BookRepository } from "../repository/bookRepository";
const mock = {
  bookName: "Cálice de Fogo",
};

beforeAll(async () => {
  const result = await BookRepository.get(mock.bookName);
  if (!result) {
    await BookRepository.create({
      author: "Henrque Rizzo",
      bookName: mock.bookName,
    });
  }
});

describe("Get book service unit tests", async () => {
  test("Get book service if have an argument should return a specific book", async () => {
    const service = new GetBookService();
    const result = await service.execute(mock.bookName);
    expect(result).toHaveProperty("id");
  });
  test("Get book service if do not have an argument should return all books", async () => {
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
    await BookRepository.delete({
      author: "Henrique Rizzo",
      bookName: mock.bookName,
    });
  }
});
