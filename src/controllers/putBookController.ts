import { Response, Request } from "express";
import { PutBookService } from "../services/putBookService";
import { APIError } from "../utils/APIError";

class PutBookController {
  static async handle(req: Request, res: Response) {
    try {
      const service = new PutBookService();
      const updatedBook = service.execute(req.body);
      res.status(201).json({ message: updatedBook });
    } catch (error) {
      const { statusCode, message } = error as APIError;
      res.status(statusCode).json({ message: message });
    }
  }
}

export { PutBookController };
