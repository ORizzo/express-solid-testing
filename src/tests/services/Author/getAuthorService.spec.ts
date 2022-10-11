import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { GetAuthorService } from "../../../services/Author/getAuthorService";
import { AuthorRepository } from "../../../repository/authorRepository";
const mock = {
  authorName: "Henrique Rizzo",
};

beforeAll(async () => {
  const result = await AuthorRepository.get(mock.authorName);
  if (!result) {
    await AuthorRepository.create({ authorName: mock.authorName });
  }
});

describe("Get author service unit tests", async () => {
  test("If get author service have an argument should return a specific author", async () => {
    const service = new GetAuthorService();
    const result = await service.execute(mock.authorName);
    expect(result).toHaveProperty("id");
  });
  test("If get author service do not have an argument should return all authors", async () => {
    const length = await AuthorRepository.getAll().then((books) => {
      return books.length;
    });
    const service = new GetAuthorService();
    const result = await service.execute();
    expect(result).toHaveLength(length);
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
