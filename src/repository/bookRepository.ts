import { PrismaClient } from "@prisma/client";
import { Book } from "../entities/Book";
const prisma = new PrismaClient();

type BookToCreate = {
  author: string;
  bookName: string;
};
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
  static async create(bookToCreate: BookToCreate): Promise<Book> {
    const { author, bookName } = bookToCreate;
    const createdBook = await prisma.book.create({
      data: {
        name: bookName,
        author: {
          connectOrCreate: {
            create: {
              name: author,
            },
            where: {
              name: author,
            },
          },
        },
      },
    });
    return createdBook;
  }
}

export { BookRepository, BookToCreate };
