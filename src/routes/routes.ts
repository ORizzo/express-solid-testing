import { Router, Request, Response } from "express";
import {
  GetBookController,
  PostBookController,
  DeleteBookController,
  PutBookController,
  GetAuthorController,
  PostAuthorController,
  DeleteAuthorController,
  PutAuthorController,
} from "../controllers/controllers";
const router = Router();

router.get("/book", async (req: Request, res: Response) => {
  GetBookController.handle(req, res);
});
router.post("/book", async (req: Request, res: Response) => {
  PostBookController.handle(req, res);
});
router.put("/book", async (req: Request, res: Response) => {
  PutBookController.handle(req, res);
});
router.delete("/book", async (req: Request, res: Response) => {
  DeleteBookController.handle(req, res);
});

router.get("/author", async (req: Request, res: Response) => {
  GetAuthorController.handle(req, res);
});
router.post("/author", async (req: Request, res: Response) => {
  PostAuthorController.handle(req, res);
});
router.put("/author", async (req: Request, res: Response) => {
  PutAuthorController.handle(req, res);
});
router.delete("/author", async (req: Request, res: Response) => {
  DeleteAuthorController.handle(req, res);
});

export { router };
