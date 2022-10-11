import { Author } from "../../entities/Author";
import { AuthorRepository, AuthorToDelete } from "../../repository/authorRepository";
import { APIError } from "../../utils/APIError";

class DeleteAuthorService {
  async execute(authorToDelete: AuthorToDelete): Promise<Author | APIError> {
    const { authorName } = authorToDelete;
    if (!authorName) {
      throw new APIError(`Please provide a valide value to authorName.`, 400);
    }
    const authorExists = await AuthorRepository.get(authorName);
    if (!authorExists) {
      throw new APIError(
        `The author which you want to delete do not exists in the database, author: ${authorName}`,
        409
      );
    } else {
      const deletedAuthor = await AuthorRepository.delete(authorToDelete);
      return deletedAuthor;
    }
  }
}

export { DeleteAuthorService };
