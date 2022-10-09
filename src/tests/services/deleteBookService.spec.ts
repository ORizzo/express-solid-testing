import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { DeleteBookService } from "../../services/deleteBookService";
import { BookRepository } from "../../repository/bookRepository";
import { APIError } from "../../utils/APIError";

const mock = {
  author: "Mock Author",
  bookName: "Mock Book",
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

describe("Delete book service unit tests", async () => {
  test("If delete book service have an argument should return a new created book", async () => {
    const service = new DeleteBookService();
    const result = await service.execute(mock);
    expect(result).toHaveProperty("id");
  });
  test("If delete book service try to delete a nonexistent book, it will fail", async () => {
    try {
      const service = new DeleteBookService();
      await service.execute(mock);
    } catch (error) {
      const { message, statusCode } = error as APIError;
      expect(error).toBeInstanceOf(APIError);
      expect(message).toEqual(
        `The book which you want to delete do not exists in the database, book: ${mock.bookName}`
      );
      expect(statusCode).toEqual(409);
    }
  });
});

afterAll(async () => {
  const result = await BookRepository.get(mock.bookName);
  if (result) {
    await BookRepository.delete({
      author: mock.author,
      bookName: mock.bookName,
    });
  }
});
