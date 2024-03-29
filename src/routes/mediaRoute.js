import { Router } from "express";
import {
  getAllMedia,
  getMediaById,
  createMedia,
  addCommentinMedia,
  updateMedia,
  deleteCommentinMedia,
  deleteMedia,
} from "../controllers/mediaController";
import { uploadMedia } from "../middlewares/multer"

const mediaRouter = Router();


mediaRouter.get("/allmedia", getAllMedia);
mediaRouter.get("/:id", getMediaById);

mediaRouter.post("/create-media",uploadMedia.single("mediaType"), createMedia);
mediaRouter.post("/:mediaId/add-comment", addCommentinMedia);

mediaRouter.put("/update-media/:id", updateMedia);
mediaRouter.put("/:mediaId/delete-comment/:commentId", deleteCommentinMedia);

mediaRouter.delete("/delete/:mediaId", deleteMedia);

export default mediaRouter;

//Le decorateur peut utiliser ses routes que si il est connecter,est ce que je dois mettre auth

// mediaRouter.post("/create-media",uploadMedia.array("mediaType"), createMedia);