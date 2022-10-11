import { Response, Request } from "express";
import { PutAuthorService } from "../../services/Author/putAuthorService";
import { APIError } from "../../utils/APIError";

class PutAuthorController {
  static async handle(req: Request, res: Response) {
    try {
      const service = new PutAuthorService();
      const updatedAuthor = await service.execute(req.body);
      res.status(201).json(updatedAuthor);
    } catch (error) {
      const { statusCode, message } = error as APIError;
      res.status(statusCode).json({ message: message });
    }
  }
}

export { PutAuthorController };
