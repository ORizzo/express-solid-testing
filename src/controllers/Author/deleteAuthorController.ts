import { Response, Request } from "express";
import { DeleteAuthorService } from "../../services/Author/deleteAuthorService";
import { APIError } from "../../utils/APIError";

class DeleteAuthorController {
  static async handle(req: Request, res: Response) {
    try {
      const service = new DeleteAuthorService();
      const deletedAuthor = await service.execute(req.body);
      res.json(deletedAuthor);
    } catch (error) {
      const { statusCode, message } = error as APIError;
      res.status(statusCode).json({ message: message });
    }
  }
}

export { DeleteAuthorController };
