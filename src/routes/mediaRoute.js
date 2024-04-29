import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  getAllMedia,
  getMediaById,
  createMedia,
  addCommentinMedia,
  updateMedia,
  deleteMedia,
  deleteCommentInMedia,
} from "../controllers/mediaController";
import { uploadMedia } from "../middlewares/multer";

const mediaRouter = Router();

mediaRouter.post(
  "/create-media",
  uploadMedia.single("imageMedia"),
  auth,
  createMedia
);



mediaRouter.get("/allmedia", getAllMedia);
mediaRouter.get("/:id", getMediaById);
mediaRouter.post("/:mediaId/comment", auth, addCommentinMedia);

mediaRouter.put("/update-media/:id", auth, updateMedia);

mediaRouter.delete("/:media/delete-comment/:comment", deleteCommentInMedia);

mediaRouter.delete("/delete/:id", auth, deleteMedia);

export default mediaRouter;
