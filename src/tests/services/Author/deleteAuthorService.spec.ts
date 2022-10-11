import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { DeleteAuthorService } from "../../../services/Author/deleteAuthorService";
import { AuthorRepository } from "../../../repository/authorRepository";
import { APIError } from "../../../utils/APIError";

const mock = {
  authorName: "Mock Author",
};

beforeAll(async () => {
  const result = await AuthorRepository.get(mock.authorName);
  if (!result) {
    await AuthorRepository.create({
      authorName: mock.authorName,
    });
  }
});

describe("Delete author service unit tests", async () => {
  test("If delete author service have an argument should return a deleted author", async () => {
    const service = new DeleteAuthorService();
    const result = await service.execute(mock);
    expect(result).toHaveProperty("id");
  });
  test("If delete author service try to delete a nonexistent author, it will fail", async () => {
    try {
      const service = new DeleteAuthorService();
      await service.execute(mock);
    } catch (error) {
      const { message, statusCode } = error as APIError;
      expect(error).toBeInstanceOf(APIError);
      expect(message).toEqual(
        `The author which you want to delete do not exists in the database, author: ${mock.authorName}`
      );
      expect(statusCode).toEqual(409);
    }
  });
});

afterAll(async () => {
  const result = await AuthorRepository.get(mock.authorName);
  if (result) {
    await AuthorRepository.delete({
      authorName: mock.authorName,
    });
  }
});
