import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/userController";
import { regValidation } from "../validation/registaration";

export const userRouter = Router();

userRouter.post('/login', passport.authenticate('local'), userController.login)
userRouter.post('/registration', regValidation, userController.registration)
userRouter.get('/auth', userController.authMe)
userRouter.get('/logout', userController.logout)