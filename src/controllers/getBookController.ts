import { Response, Request } from "express";
import { GetBookService } from "../services/getBookService";
import { APIError } from "../utils/APIError";

class GetBookController {
  static async handle(req: Request, res: Response) {
    const service = new GetBookService();
    const bookToSearch = req.body.bookName;

    try {
      if (bookToSearch) {
        const book = await service.execute(bookToSearch);
        return res.json(book);
      }
      const book = await service.execute();
      return res.json(book);
    } catch (error) {
      const { message, statusCode } = error as APIError;
      res.status(statusCode).json({ message: message });
    }
  }
}

export { GetBookController };
