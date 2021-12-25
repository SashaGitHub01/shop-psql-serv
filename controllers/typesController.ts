import express from 'express';
import { Type } from '../models';


class TypesCtrl {
   create = async (req: express.Request, res: express.Response) => {
      try {
         const { name } = req.body;

         const type = await Type.create({ name })

         if (!type) return res.status(400).send();

         return res.json({
            data: type
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
         const types = await Type.findAll();

         if (!types) return res.status(500).send();

         return res.json({
            data: types
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

         const type = await Type.findOne({ where: { id } });

         if (!type) return res.status(500).send();

         return res.json({
            data: type
         })

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }
}

export const typesController = new TypesCtrl();