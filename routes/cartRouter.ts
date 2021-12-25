import { Router } from "express";
import passport from "passport";
import { cartController } from "../controllers/cartController";

export const cartRouter = Router();

cartRouter.get('/', passport.authenticate('jwt'), cartController.getOne)
cartRouter.post('/:id', passport.authenticate('jwt'), cartController.create)
cartRouter.delete('/:id', passport.authenticate('jwt'), cartController.delete)
cartRouter.put('/incr/:id', passport.authenticate('jwt'), cartController.incr)
cartRouter.put('/decr/:id', passport.authenticate('jwt'), cartController.decr)