import { Router } from "express";
import { addCommentinMediainProject, addMediainProject, addUserinProject, createProject, deleteProject, getAllMediaInProject, getAllProject, updateProject } from "../controllers/project2Controller";
import { uploadMedia } from "../middlewares/multer";


const projectRouter = Router();


projectRouter.get('/all-projects', getAllProject)

projectRouter.get('/:projectId/all-media', getAllMediaInProject)

projectRouter.post('/create-project', createProject)

projectRouter.post('/:id/invite-users', addUserinProject)

projectRouter.post('/:id/create-media',uploadMedia.single("imageMedia"), addMediainProject)

projectRouter.post('/:id/comment/:mediaId', addCommentinMediainProject)

projectRouter.put('/:id', updateProject) // voir qu'est j'update dans le corsp de ma requete?//

projectRouter.delete('/:id', deleteProject)


export default projectRouter;