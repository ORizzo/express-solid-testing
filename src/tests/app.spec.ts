import app from "../app";
import { BookRepository } from "../repository/bookRepository";
import { test, expect, describe, beforeAll } from "vitest";
import { agent } from "supertest";

const mock = {
  author: "Henrique Rizzo",
  bookName: "Cálice de 200",
  newBookName: "Cálice de 204",
};

beforeAll(async () => {
  const bookExits = await BookRepository.get(mock.bookName);
  if (bookExits) {
    await BookRepository.delete({
      author: mock.author,
      bookName: mock.bookName,
    });
  }
});

describe("Integration test", async () => {
  test("Should create a book in the database", async () => {
    const response = await agent(app).post("/book").send({
      author: mock.author,
      bookName: mock.bookName,
    });
    expect(response.body).toBeTruthy();
    expect(response.statusCode).toEqual(201);
  });
  test("Should get a book from the database", async () => {
    const response = await agent(app).get("/book");
    const books = response.body;
    const book = books.find((element) => element.name == mock.bookName);
    expect(book.name).toEqual(mock.bookName);
    expect(response.statusCode).toEqual(200);
  });
  test("Should update a book from the database", async () => {
    const response = await agent(app).put("/book").send({
      bookName: mock.bookName,
      newBookName: mock.newBookName,
    });
    const updatedBook = response.body;

    expect(updatedBook.name).toEqual(mock.newBookName);
    expect(response.statusCode).toEqual(201);
  });
  test("Should delete a book from the database", async () => {
    const response = await agent(app).delete("/book").send({
      bookName: mock.newBookName,
    });
    const deletedBook = response.body;

    expect(deletedBook.name).toEqual(mock.newBookName);
    expect(response.statusCode).toEqual(200);
  });
});
