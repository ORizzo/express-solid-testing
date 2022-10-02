import app from "./app";
import { test, expect, describe } from "vitest";
const supertest = require("supertest");
//import * as supertest from 'supertest'

describe("Integration test", async () => {
  const mock = {
    author: "Henrique Rizzo",
    bookName: "Cálice de 200",
    newBookName: "Cálice de 204",
  };
  test("Should create a book in the database", async () => {
    const response = await supertest(app).post("/book").send({
      author: mock.author,
      bookName: mock.bookName,
    });
    expect(response.body).toBeTruthy();
    expect(response.statusCode).toEqual(200);
  });
  test("Should get a book from the database", async () => {
    const response = await supertest(app).get("/book");
    const books = response.body;
    const book = books.find((element) => element.title == mock.bookName);
    expect(book.title).toEqual(mock.bookName);
    expect(response.statusCode).toEqual(200);
  });
  test("Should update a book from the database", async () => {
    const response = await supertest(app).put("/book").send({
      bookName: mock.bookName,
      newBookName: mock.newBookName,
    });
    const updatedBook = response.body;

    expect(updatedBook.title).toEqual(mock.newBookName);
    expect(response.statusCode).toEqual(200);
  });
  test("Should delete a book from the database", async () => {
    const response = await supertest(app).delete("/book").send({
      bookName: mock.newBookName,
    });
    const deletedBook = response.body;

    expect(deletedBook.title).toEqual(mock.newBookName);
    expect(response.statusCode).toEqual(200);
  });
});
