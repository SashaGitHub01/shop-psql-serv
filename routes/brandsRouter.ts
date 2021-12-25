import { Router } from "express";
import { Multer } from "multer";
import { brandsController } from "../controllers/brandsController";

export const brandsRouter = Router();

brandsRouter.get('/', brandsController.getAll)
brandsRouter.get('/:id', brandsController.getOne)
brandsRouter.post('/', brandsController.create)
brandsRouter.delete('/:id')