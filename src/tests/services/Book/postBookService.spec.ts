import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { PostBookService } from "../../../services/Book/postBookService";
import { BookRepository } from "../../../repository/bookRepository";
import { AuthorRepository } from "../../../repository/authorRepository";
import { APIError } from "../../../utils/APIError";

const mock = {
  author: "Mock Author",
  bookName: "Mock book",
};

beforeAll(async () => {
  const result = await BookRepository.get(mock.bookName);
  if (result) {
    await BookRepository.delete({
      author: mock.author,
      bookName: mock.bookName,
    });
  }
});

describe("Post book service unit tests", async () => {
  test("If post book service have an argument should return a new created book", async () => {
    const service = new PostBookService();
    const result = await service.execute(mock);
    expect(result).toHaveProperty("id");
  });
  test("If post book service try to created an existent book, it will fail", async () => {
    try {
      const service = new PostBookService();
      await service.execute(mock);
    } catch (error) {
      const { message, statusCode } = error as APIError;
      expect(error).toBeInstanceOf(APIError);
      expect(message).toEqual(
        `The book which you want to create already exists in the database, book: ${mock.bookName}`
      );
      expect(statusCode).toEqual(409);
    }
  });
});

afterAll(async () => {
  const result = await BookRepository.get(mock.bookName);
  if (result) {
    await AuthorRepository.delete({
      authorName: mock.author,
    });
  }
});
