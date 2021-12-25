import { Router } from "express";
import { upload } from "../core/multer";
import { uploadsController } from "../controllers/uploadsController";

export const uploadRouter = Router();

uploadRouter.post('/brands', upload.single('logo'), uploadsController.uploadBrand)
uploadRouter.post('/items', upload.single('image'), uploadsController.uploadItem)