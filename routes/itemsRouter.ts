import { Router } from "express";
import { itemsController } from "../controllers/itemsController";

export const itemsRouter = Router();

itemsRouter.get('/', itemsController.getAll)
itemsRouter.get('/:id', itemsController.getOne)
itemsRouter.post('/', itemsController.create)
itemsRouter.delete('/')