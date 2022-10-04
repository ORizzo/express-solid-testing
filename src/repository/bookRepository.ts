import { PrismaClient } from "@prisma/client";
import { Book } from "../entities/Book";
const prisma = new PrismaClient();
class BookRepository {
  static async getAll(): Promise<Book[]> {
    const books = await prisma.book.findMany();
    return books;
  }
  static async get(bookName: string): Promise<Book | Error> {
    const book = await prisma.book.findUnique({
      where: {
        title: bookName,
      },
    });
    if (!book) {
      throw new Error("");
    }
    return book;
  }
}

export { BookRepository };
