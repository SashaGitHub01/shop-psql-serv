import { Router } from "express";
import { typesController } from "../controllers/typesController";

export const typesRouter = Router();

typesRouter.get('/', typesController.getAll)
typesRouter.get('/:id', typesController.getOne)
typesRouter.post('/', typesController.create)
typesRouter.delete('/:id')