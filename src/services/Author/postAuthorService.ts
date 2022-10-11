import { Author } from "../../entities/Author";
import {
  AuthorRepository,
  AuthorToCreate,
} from "../../repository/authorRepository";
import { APIError } from "../../utils/APIError";

class PostAuthorService {
  async execute(
    authorToCreate: AuthorToCreate
  ): Promise<Author[] | Author | APIError> {
    const { authorName } = authorToCreate;
    if (!authorName) {
      throw new APIError(`Please provide a valide value to authorName`, 400);
    }
    const authorAlreadyExists = await AuthorRepository.get(authorName);
    if (authorAlreadyExists) {
      throw new APIError(
        `The author which you want to create already exists in the database, author: ${authorName}`,
        409
      );
    } else {
      const createdAuthor = await AuthorRepository.create(authorToCreate);
      return createdAuthor;
    }
  }
}

export { PostAuthorService };
