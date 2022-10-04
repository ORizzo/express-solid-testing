import { Response } from "express";
import { GetBookService } from "../services/getBookService";

class GetBookController {
  static async handle(res: Response) {
    const service = new GetBookService();

    const book = await service.execute();
    
    res.json(book);
  }
}

export { GetBookController };
