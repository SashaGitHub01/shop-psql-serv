import express from 'express';
import { Brand } from '../models';


class BrandsCtrl {
   create = async (req: express.Request, res: express.Response) => {
      try {
         const { name, image } = req.body;

         const brand = await Brand.create({ name, image })

         if (!brand) return res.status(400).send();

         return res.json({
            data: brand
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
         const brands = await Brand.findAll();

         if (!brands) return res.status(500).send();

         return res.json({
            data: brands
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

         const brand = await Brand.findOne({ where: { id } });

         if (!brand) return res.status(500).send();

         return res.json({
            data: brand
         })

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }

}

export const brandsController = new BrandsCtrl();