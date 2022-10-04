import { Book } from "../entities/Book";
import { BookRepository, BookToCreate } from "../repository/bookRepository";
import { APIError } from "../utils/APIError";

class PostBookService {
  async execute(bookToCreate: BookToCreate): Promise<Book | APIError> {
    const { bookName } = bookToCreate;
    const bookAlreadyExists = await BookRepository.get(bookName);
    if (bookAlreadyExists) {
      throw new APIError(
        `The book which you want to create already exists in the database, book: ${bookName}`,
        409
      );
    } else {
      const createdBook = await BookRepository.create(bookToCreate);
      return createdBook;
    }
  }
}

export { PostBookService };
