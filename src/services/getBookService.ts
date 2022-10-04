import { Book } from "../entities/Book";
import { BookRepository } from "../repository/bookRepository";
import { errorResponse } from "../types/Error";

class GetBookService {
  async execute(): Promise<Book[] | errorResponse> {
    const books = await BookRepository.getAll();
    
    if (books instanceof Error) {
      const errorMessage = books.message;
      console.error(
        `The book which you want to find do not exists in the database, error message: ${errorMessage}`
      );
      return {
        status: 409,
        message: errorMessage,
      };
    }
    return books;
  }
}

export { GetBookService };
