import { Book } from "../../entities/Book";
import { BookRepository, BookToUpdate } from "../../repository/bookRepository";
import { APIError } from "../../utils/APIError";

class PutBookService {
  async execute(bookToUpdate: BookToUpdate): Promise<Book | APIError> {
    const { bookName, newBookName } = bookToUpdate;
    if (!bookName) {
      throw new APIError(`Please provide a valide value to bookName field.`, 400);
    }
    if (!newBookName) {
      throw new APIError(`Please provide a valide value to newBookName field.`, 400);
    }
    const bookExists = await BookRepository.get(bookName);
    if (bookExists) {
      const updatedBook = await BookRepository.update(bookToUpdate);
      return updatedBook;
    } else {
      throw new APIError(
        `The book which you want to update do not exists in the database, book: ${bookName}`,
        409
      );
    }
  }
}

export { PutBookService };
