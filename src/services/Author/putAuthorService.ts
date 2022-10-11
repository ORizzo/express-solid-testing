import { Author } from "../../entities/Author";
import { AuthorRepository, AuthorToUpdate } from "../../repository/authorRepository";
import { APIError } from "../../utils/APIError";

class PutAuthorService {
  async execute(authorToUpdate: AuthorToUpdate): Promise<Author | APIError> {
    const { authorName, newAuthorName } = authorToUpdate;
    if (!authorName) {
      throw new APIError(`Please provide a valide value to authorName field.`, 400);
    }
    if (!newAuthorName) {
      throw new APIError(`Please provide a valide value to newAuthorName field.`, 400);
    }
    const authorExists = await AuthorRepository.get(authorName);
    if (authorExists) {
      const updatedAuthor = await AuthorRepository.update(authorToUpdate);
      return updatedAuthor;
    } else {
      throw new APIError(
        `The author which you want to update do not exists in the database, author: ${authorName}`,
        409
      );
    }
  }
}

export { PutAuthorService };
