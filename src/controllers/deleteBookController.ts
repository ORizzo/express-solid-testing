import { Response, Request } from "express";
import { DeleteBookService } from "../services/deleteBookService";
import { APIError } from "../utils/APIError";

class DeleteBookController {
  static async handle(req: Request, res: Response) {
    try {
      const service = new DeleteBookService();
      const deletedBook = await service.execute(req.body);
      res.json(deletedBook);
    } catch (error) {
      const { statusCode, message } = error as APIError;
      res.status(statusCode).json({ message: message });
    }
  }
}

export { DeleteBookController };
