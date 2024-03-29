import {Router} from "express";
import { login,register } from "../controllers/decoratorController";



const decoratorRouter = Router()

decoratorRouter.post("/register", register);
decoratorRouter.post("/login", login);


export default decoratorRouter