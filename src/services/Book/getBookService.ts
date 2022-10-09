import { Book } from "../../entities/Book";
import { BookRepository } from "../../repository/bookRepository";
import { APIError } from "../../utils/APIError";

class GetBookService {
  async execute(bookToSearch?: string): Promise<Book[] | Book | APIError> {
    if (bookToSearch) {
      const book = await BookRepository.get(bookToSearch);
      if (!book) {
        throw new APIError(
          `The book which you want to find do not exists in the database.`,
          409
        );
      }
      return book;
    }
    const books = await BookRepository.getAll();
    return books;
  }
}

export { GetBookService };
