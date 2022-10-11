import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { PostAuthorService } from "../../../services/Author/postAuthorService";
import { AuthorRepository } from "../../../repository/authorRepository";
import { APIError } from "../../../utils/APIError";

const mock = {
  authorName: "Mock Author",
};

beforeAll(async () => {
  const result = await AuthorRepository.get(mock.authorName);
  if (result) {
    await AuthorRepository.delete({
      authorName: mock.authorName,
    });
  }
});

describe("Post author service unit tests", async () => {
  test("If post author service have an argument should return a new created author", async () => {
    const service = new PostAuthorService();
    const result = await service.execute(mock);
    expect(result).toHaveProperty("id");
  });
  test("If post author service try to created an existent author, it will fail", async () => {
    try {
      const service = new PostAuthorService();
      await service.execute(mock);
    } catch (error) {
      const { message, statusCode } = error as APIError;
      expect(error).toBeInstanceOf(APIError);
      expect(message).toEqual(
        `The author which you want to create already exists in the database, author: ${mock.authorName}`
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
