import { PrismaClient } from "@prisma/client";
import { Author } from "../entities/Author";
const prisma = new PrismaClient();

type AuthorToCreate = {
  authorName: string;
};
type AuthorToDelete = {
  authorName: string;
};
type AuthorToUpdate = {
  authorName: string;
  newAuthorName: string;
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
  static async create(authorToCreate: AuthorToCreate): Promise<Author> {
    const { authorName } = authorToCreate;
    const createdAuthor = await prisma.author.create({
      data: {
        name: authorName,
      },
    });
    return createdAuthor;
  }
  static async delete(authorToDelete: AuthorToDelete) {
    const { authorName } = authorToDelete;
    const deletedAuthor = await prisma.author.delete({
      where: {
        name: authorName,
      },
    });
    return deletedAuthor;
  }
  static async update(authorToDelete: AuthorToUpdate) {
    const { authorName, newAuthorName } = authorToDelete;
    const updatedAuthor = await prisma.author.update({
      where: {
        name: authorName,
      },
      data: {
        name: newAuthorName,
      },
    });
    return updatedAuthor;
  }
}

export { AuthorRepository, AuthorToCreate, AuthorToDelete, AuthorToUpdate };
