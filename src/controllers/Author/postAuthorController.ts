import { Response, Request } from "express";
import { PostAuthorService } from "../../services/Author/postAuthorService";
import { APIError } from "../../utils/APIError";

class PostAuthorController {
  static async handle(req: Request, res: Response) {
    try {
      const service = new PostAuthorService();
      const createdAuthor = await service.execute(req.body);
      res.status(201).json(createdAuthor);
    } catch (error) {
      const { statusCode, message } = error as APIError;
      res.status(statusCode).json({ message: message });
    }
  }
}

export { PostAuthorController };
