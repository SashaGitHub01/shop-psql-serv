import { Router } from "express";
import { brandsRouter } from "./brandsRouter";
import { cartRouter } from "./cartRouter";
import { itemsRouter } from "./itemsRouter";
import { typesRouter } from "./typesRouter";
import { uploadRouter } from "./uploadRouter";
import { userRouter } from "./userRouter";

export const router = Router();

router.use('/user', userRouter)
router.use('/cart', cartRouter)
router.use('/types', typesRouter)
router.use('/brands', brandsRouter)
router.use('/items', itemsRouter)
router.use('/upload', uploadRouter)