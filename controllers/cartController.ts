import express from 'express';
import { Cart, CartItem } from '../models';
import { IUser } from '../types/IUser';

class CartCtrl {
   create = async (req: express.Request, res: express.Response) => {
      try {
         const userId = req.user;
         const id = req.params.id;

         if (!userId) return res.status(401).send();

         const cart = await Cart.findOne({ where: { userId } })

         if (!cart) return res.status(404).send();

         const isContains = await CartItem.findOne({ where: { cartId: cart.id } })

         if (isContains) {
            return res.status(400).send();
         }

         const item = await CartItem.create({ itemId: id, cartId: cart.id })

         return res.json({
            data: item
         })

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }

   getOne = async (req: express.Request, res: express.Response) => {
      try {
         const id = req.user;

         if (!id) return res.status(401).send();

         const cart = await Cart.findOne({
            where: { userId: id },
            include: {
               model: CartItem,
            }
         });

         return res.json({
            data: cart
         })

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }

   delete = async (req: express.Request, res: express.Response) => {
      try {
         const userId = req.user;
         const id = req.params.id;

         if (!userId) return res.status(401).send();

         const cart = await Cart.findOne({ where: { userId } });

         if (!cart) return res.status(404).send();

         const item = await CartItem.destroy({ where: { cartId: cart.id, itemId: id } });

         return res.json({
            data: item
         })

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }

   incr = async (req: express.Request, res: express.Response) => {
      try {
         const userId = req.user;
         const id = req.params.id;

         if (!userId) return res.status(401).send();

         const cart = await Cart.findOne({ where: { userId } });
         if (!cart) return res.status(404).send();

         const item = await CartItem.findOne({ where: { cartId: cart.id, itemId: id } });

         if (!item) return res.status(404).send();

         item.total = item.total + 1;

         await item.save();
         await item.reload();

         return res.json({
            data: item
         })

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }

   decr = async (req: express.Request, res: express.Response) => {
      try {
         const userId = req.user;
         const id = req.params.id;

         if (!userId) return res.status(401).send();

         const cart = await Cart.findOne({ where: { userId } });
         if (!cart) return res.status(404).send();

         const item = await CartItem.findOne({ where: { cartId: cart.id, itemId: id } });

         if (!item) return res.status(404).send();

         if (item.total === 1) {
            item.destroy()

            await item.save();

            return res.json({
               data: item
            })
         }

         item.total = item.total - 1;

         await item.save();
         await item.reload();

         return res.json({
            data: item
         })

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }
}

export const cartController = new CartCtrl();