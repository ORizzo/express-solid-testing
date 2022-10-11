import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { PutAuthorService } from "../../../services/Author/putAuthorService";
import { AuthorRepository } from "../../../repository/authorRepository";
import { APIError } from "../../../utils/APIError";

const mock = {
  authorName: "Mock Author",
  newAuthorName: "New Mock Author",
};

beforeAll(async () => {
  const result = await AuthorRepository.get(mock.authorName);
  if (!result) {
    await AuthorRepository.create({
      authorName: mock.authorName,
    });
  }
});

describe("Put author service unit tests", async () => {
  test("If put author service have an argument should return a new updated author", async () => {
    const service = new PutAuthorService();
    const result = await service.execute(mock);
    expect(result).toHaveProperty("id");
    expect(result.name).toEqual(mock.newAuthorName);
  });
  test("If put author service try to updated a nonexistent author, it will fail", async () => {
    try {
      const service = new PutAuthorService();
      await service.execute({
        authorName: mock.authorName,
        newAuthorName: mock.newAuthorName,
      });
    } catch (error) {
      const { message, statusCode } = error as APIError;
      expect(error).toBeInstanceOf(APIError);
      expect(message).toEqual(
        `The author which you want to update do not exists in the database, author: ${mock.authorName}`
      );
      expect(statusCode).toEqual(409);
    }
  });
});

afterAll(async () => {
  const result = await AuthorRepository.get(mock.newAuthorName);
  if (result) {
    await AuthorRepository.delete({
      authorName: mock.newAuthorName,
    });
  }
});
