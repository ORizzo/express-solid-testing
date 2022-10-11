import { Author } from "../../entities/Author";
import { AuthorRepository } from "../../repository/authorRepository";
import { APIError } from "../../utils/APIError";

class GetAuthorService {
  async execute(
    authorToSearch?: string
  ): Promise<Author[] | Author | APIError> {
    if (authorToSearch) {
      const author = await AuthorRepository.get(authorToSearch);
      if (!author) {
        throw new APIError(
          `The author which you want to find do not exists in the database.`,
          409
        );
      }
      return author;
    }
    const authors = await AuthorRepository.getAll();
    return authors;
  }
}

export { GetAuthorService };
