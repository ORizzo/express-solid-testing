import { Book } from "../../entities/Book";
import { BookRepository, BookToDelete } from "../../repository/bookRepository";
import { APIError } from "../../utils/APIError";

class DeleteBookService {
  async execute(bookToDelete: BookToDelete): Promise<Book | APIError> {
    const { bookName } = bookToDelete;
    if (!bookName) {
      throw new APIError(`Please provide a valide book name to delete.`, 400);
    }
    const bookExists = await BookRepository.get(bookName);
    if (!bookExists) {
      throw new APIError(
        `The book which you want to delete do not exists in the database, book: ${bookName}`,
        409
      );
    } else {
      const deletedBook = await BookRepository.delete(bookToDelete);
      return deletedBook;
    }
  }
}

export { DeleteBookService };
