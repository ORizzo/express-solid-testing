import { Response, Request } from "express";
import { GetAuthorService } from "../../services/Author/getAuthorService";
import { APIError } from "../../utils/APIError";

class GetAuthorController {
  static async handle(req: Request, res: Response) {
    try {
      const service = new GetAuthorService();
      const authorToSearch = req.body.bookName;
      if (authorToSearch) {
        const book = await service.execute(authorToSearch);
        return res.json(book);
      } else {
        const book = await service.execute();
        return res.json(book);
      }
    } catch (error) {
      const { message, statusCode } = error as APIError;
      res.status(statusCode).json({ message: message });
    }
  }
}

export { GetAuthorController };
