import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { PostBookService } from "../services/postBookService";
import { BookRepository } from "../repository/bookRepository";
import { APIError } from "../utils/APIError";

const mock = {
  author: "Henrique Rizzo",
  bookName: "Cálice de Fogo 2",
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
  test("Post book service if have an argument should return a new created book", async () => {
    const service = new PostBookService();
    const result = await service.execute(mock);
    expect(result).toHaveProperty("id");
  });
  test("Post book service if try to created an existent book, it will fail", async () => {
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
    await BookRepository.delete({
      author: mock.author,
      bookName: mock.bookName,
    });
  }
});
