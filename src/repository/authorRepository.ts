import { PrismaClient } from "@prisma/client";
import { Author } from "../entities/Author";
const prisma = new PrismaClient();

type BookToCreate = {
  author: string;
  bookName: string;
};
type BookToDelete = {
  author: string;
  bookName: string;
};
type BookToUpdate = {
  bookName: string;
  newBookName: string;
};

class AuthorRepository {
  static async getAll(): Promise<Author[]> {
    const authors = await prisma.author.findMany();
    return authors;
  }
  static async get(authorName: string): Promise<Author | null> {
    const author = await prisma.author.findUnique({
      where: {
        name: authorName,
      },
    });
    return author;
  }
  static async create(bookToCreate: BookToCreate): Promise<Author> {
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
  static async delete(bookToDelete: BookToDelete) {
    const { bookName } = bookToDelete;
    const deletedBook = await prisma.book.delete({
      where: {
        name: bookName,
      },
    });
    return deletedBook;
  }
  static async update(bookToUpdate: BookToUpdate) {
    const { bookName, newBookName } = bookToUpdate;
    const updatedBook = await prisma.book.update({
      where: {
        name: bookName,
      },
      data: {
        name: newBookName,
      },
    });
    return updatedBook;
  }
}

export { AuthorRepository, BookToCreate, BookToDelete, BookToUpdate };
