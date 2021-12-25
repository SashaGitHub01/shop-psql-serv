import express from 'express';
import { Item, ItemInfo } from '../models';

interface IQuery {
   typeId?: string,
   brandId?: string,
   limit?: number,
   page?: number
}

interface IInfoBody {
   title: string,
   description: string
}

class ItemsCtrl {
   create = async (req: express.Request, res: express.Response) => {
      try {
         const { name, image, price, info, typeId, brandId } = req.body;

         const data = {
            name,
            price,
            image,
            typeId,
            brandId
         }

         const item = await Item.create(data)

         if (!item) return res.status(400).send();

         if (info) {
            (info as IInfoBody[]).forEach(async ({ title, description }) => (
               await ItemInfo.create({ itemId: item.id, title, description }))
            )
         }

         await item.reload()

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

   getAll = async (req: express.Request, res: express.Response) => {
      try {
         let { typeId, brandId, limit, page } = req.query as IQuery;
         let items;

         page = page || 1;
         limit = limit || 9;

         const offset = page * limit - limit;

         if (!brandId && !typeId) {
            items = await Item.findAndCountAll({ offset, limit });
         }

         if (brandId && !typeId) {
            items = await Item.findAndCountAll({ where: { brandId }, offset, limit });
         }

         if (!brandId && typeId) {
            items = await Item.findAndCountAll({ where: { typeId }, offset, limit });
         }

         if (brandId && typeId) {
            items = await Item.findAndCountAll({ where: { brandId, typeId }, offset, limit });
         }

         if (!items) return res.status(404).send();

         return res.json({
            data: items
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
         const id = req.params.id;

         const item = await Item.findOne({
            where: { id },
            include: {
               model: ItemInfo,
            }
         });

         if (!item) return res.status(500).send();

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

export const itemsController = new ItemsCtrl();