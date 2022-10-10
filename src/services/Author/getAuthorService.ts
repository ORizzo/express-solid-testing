import { Author } from "../../entities/Author";
import { AuthorRepository } from "../../repository/authorRepository";
import { APIError } from "../../utils/APIError";

class GetAuthorService {
  async execute(bookToSearch?: string): Promise<Author[] | Author | APIError> {
    if (bookToSearch) {
      const book = await AuthorRepository.get(bookToSearch);
      if (!book) {
        throw new APIError(
          `The author which you want to find do not exists in the database.`,
          409
        );
      }
      return book;
    }
    const books = await AuthorRepository.getAll();
    return books;
  }
}

export { GetAuthorService };
