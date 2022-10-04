import { Response, Request } from "express";
import { PostBookService } from "../services/postBookService";
import { APIError } from "../utils/APIError";

class PostBookController {
  static async handle(req: Request, res: Response) {
    try {
      const service = new PostBookService();
      const createdBook = await service.execute(req.body);
      res.json(createdBook);
    } catch (error) {
      const { statusCode, message } = error as APIError;
      res.status(statusCode).json({ message: message });
    }
  }
}

export { PostBookController };
