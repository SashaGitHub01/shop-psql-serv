import express from 'express';
import { validationResult } from 'express-validator';
import { User, Cart } from '../models';
import jwt, { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';
import { IUser } from '../types/IUser';
import bcrypt from 'bcryptjs';
import { IJwt } from '../types/IJwt';


class UserCtrl {
   registration = async (req: express.Request, res: express.Response) => {
      try {
         const { email, password, role } = req.body;

         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors })
         }

         const salt = await bcrypt.genSalt(5);
         const hash = await bcrypt.hash(password, salt);

         const data = {
            email,
            password: hash,
            role: role || "USER"
         }

         const user = await User.create(data)

         if (!user) return res.status(400).send();

         await Cart.create({ userId: user.id })

         const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'kjk1234', { expiresIn: '30d' });

         if (req.session) {
            req.session.token = token;
         }

         return res.redirect('/api/user/auth')

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }

   login = async (req: express.Request, res: express.Response) => {
      try {
         const user = req.user as IUser;
         console.log('USERRR', user.id)
         if (!user) return res.status(401).send();

         const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: '30d' })

         if (req.session) {
            req.session.token = token
         }

         return res.redirect('/api/user/auth')

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }

   authMe = async (req: express.Request, res: express.Response) => {
      try {
         const token = req.session?.token;

         if (token) {
            const decoded = jwt.decode(token)
            const id = (decoded as IJwt).id;

            const user = await User.findOne({
               where: { id },
               attributes: { exclude: ['password'] }
            });

            if (!user) return res.status(404).send();

            return res.json({
               data: user
            })
         }

         return res.status(401).json({
            data: null
         })

      } catch (err) {
         return res.status(500).json({
            data: null,
         })
      }
   }

   logout = async (req: express.Request, res: express.Response) => {
      try {
         if (req.session) {
            req.session.token = null;
         }

         return res.status(200).send()

      } catch (err) {
         return res.status(500).json({
            data: null,
         })
      }
   }
}

export const userController = new UserCtrl();