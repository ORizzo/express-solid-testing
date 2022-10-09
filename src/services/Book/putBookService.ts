import { Book } from "../../entities/Book";
import { BookRepository, BookToUpdate } from "../../repository/bookRepository";
import { APIError } from "../../utils/APIError";

class PutBookService {
  async execute(bookToUpdate: BookToUpdate): Promise<Book | APIError> {
    const { bookName } = bookToUpdate;
    const bookExists = await BookRepository.get(bookName);
    if (bookExists) {
      const updatedBook = await BookRepository.update(bookToUpdate)
      return updatedBook
    } else {
      throw new APIError(
        `The book which you want to update do not exists in the database, book: ${bookName}`,
        409
      );
    }
  }
}

export { PutBookService };
