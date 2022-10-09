import { Router, Request, Response } from "express";
import { GetBookController } from "../controllers/getBookController";
import { PostBookController } from "../controllers/postBookController";
import { DeleteBookController } from "../controllers/deleteBookController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/book", async (req: Request, res: Response) => {
  GetBookController.handle(req, res);
});
router.post("/book", async (req: Request, res: Response) => {
  PostBookController.handle(req, res);
});
router.put("/book", async (req: Request, res: Response) => {
  const { bookName, newBookName } = req.body;
  const bookAlreadyExists = await prisma.book.findFirst({
    where: {
      name: bookName,
    },
  });
  if (!bookAlreadyExists) {
    res.status(404);
    res.json("The book which you want to update do not exists in the database");
  } else {
    const updatedBook = await prisma.book.update({
      where: {
        name: bookName,
      },
      data: {
        name: newBookName,
      },
    });
    res.json(updatedBook);
  }
});
router.delete("/book", async (req: Request, res: Response) => {
  DeleteBookController.handle(req, res);
});

router.get("/author", async (_, res: Response) => {
  const authors = await prisma.author.findMany();
  res.json(authors);
});
router.post("/author", async (req: Request, res: Response) => {
  const { author } = req.body;
  const authorAlreadyExists = await prisma.author.findFirst({
    where: {
      name: author,
    },
  });
  if (!authorAlreadyExists) {
    const createdAuthor = await prisma.author.create({
      data: {
        name: author,
      },
    });
    res.json(createdAuthor);
  } else {
    res.status(409);
    res.json("The author already exists.");
  }
});
router.put("/author", async (req: Request, res: Response) => {
  const { author, newAuthor } = req.body;
  const authorAlreadyExists = await prisma.author.findFirst({
    where: {
      name: author,
    },
  });
  if (!authorAlreadyExists) {
    res.status(404);
    res.json("The book which you want to update do not exists in the database");
  } else {
    const updatedAuthor = await prisma.author.update({
      where: {
        name: author,
      },
      data: {
        name: newAuthor,
      },
    });
    res.json(updatedAuthor);
  }
});
router.delete("/author", async (req: Request, res: Response) => {
  const { author } = req.body;
  const authorAlreadyExists = await prisma.author.findFirst({
    where: {
      name: author,
    },
  });
  if (!authorAlreadyExists) {
    res.status(404);
    res.json("The book which you want to delete do not exists in the database");
  } else {
    const deletedAuthor = await prisma.author.delete({
      where: {
        name: author,
      },
    });
    res.json(deletedAuthor);
  }
});

export { router };
