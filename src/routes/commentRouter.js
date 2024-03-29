import { Router } from "express";
import {
  getAllComment,
  getCommentById,
} from "../controllers/commentController";

const commentRouter = Router();

commentRouter.get("/allcomment", getAllComment);
commentRouter.get("/:id", getCommentById);


export default commentRouter;

//Le decorateur peut utiliser ses routes que si il est connecter,est ce que je dois mettre auth?
