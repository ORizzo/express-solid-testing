import { PrismaClient } from "@prisma/client";
import { Book } from "../entities/Book";
const prisma = new PrismaClient();
class BookRepository {
  static async getAll(): Promise<Book[]> {
    const books = await prisma.book.findMany();
    return books;
  }
  static async get(bookName: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
      where: {
        name: bookName,
      },
    });
    return book;
  }
}

export { BookRepository };
