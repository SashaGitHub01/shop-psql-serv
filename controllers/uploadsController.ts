import express from 'express';
import cloudinary from 'cloudinary';
import { Brand } from '../models';

class UploadsCtrl {
   uploadBrand = async (req: express.Request, res: express.Response) => {
      try {
         const file = req.file as Express.Multer.File;

         if (!file) return res.status(400).send();

         await cloudinary.v2.uploader.upload_stream({ folder: 'Brands' }, async (err, result) => {
            if (err || !result) {
               throw Error('Upload error')
            }

            return res.json({
               data: result.secure_url
            })

         }).end(file.buffer)

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }

   uploadItem = async (req: express.Request, res: express.Response) => {
      try {
         const file = req.file as Express.Multer.File;

         if (!file) return res.status(400).send();

         await cloudinary.v2.uploader.upload_stream({ folder: 'Items' }, async (err, result) => {
            if (err || !result) {
               throw Error('Upload error')
            }

            return res.json({
               data: result.secure_url
            })

         }).end(file.buffer)

      } catch (err) {
         return res.status(500).json({
            data: null,
            error: err
         })
      }
   }
}

export const uploadsController = new UploadsCtrl();