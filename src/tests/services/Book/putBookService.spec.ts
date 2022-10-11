import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { PutBookService } from "../../../services/Book/putBookService";
import { BookRepository } from "../../../repository/bookRepository";
import { AuthorRepository } from "../../../repository/authorRepository";

import { APIError } from "../../../utils/APIError";

const mock = {
  author: "Mock Author",
  bookName: "Mock book",
  newBookName: "New mock book",
};

beforeAll(async () => {
  const result = await BookRepository.get(mock.bookName);
  if (!result) {
    await BookRepository.create({
      author: mock.author,
      bookName: mock.bookName,
    });
  }
});

describe("Put book service unit tests", async () => {
  test("If put book service have an argument should return a new updated book", async () => {
    const service = new PutBookService();
    const result = await service.execute({
      bookName: mock.bookName,
      newBookName: mock.newBookName,
    });
    expect(result).toHaveProperty("id");
    expect(result.name).toEqual(mock.newBookName);
  });
  test("If put book service try to updated a nonexistent book, it will fail", async () => {
    try {
      const service = new PutBookService();
      await service.execute(mock);
    } catch (error) {
      const { message, statusCode } = error as APIError;
      expect(error).toBeInstanceOf(APIError);
      expect(message).toEqual(
        `The book which you want to update do not exists in the database, book: ${mock.bookName}`
      );
      expect(statusCode).toEqual(409);
    }
  });
});

afterAll(async () => {
  const result = await BookRepository.get(mock.newBookName);
  if (result) {
    await AuthorRepository.delete({
      authorName: mock.author,
    });
  }
});
