import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/Item';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';

const itemsRouter = express.Router();

itemsRouter.post(
  '/',
  imagesUpload.single('image'),
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      const newItem = new Item({
        seller: req.user?._id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.file ? req.file.filename : '',
      });

      await newItem.save();
      res.send(newItem);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

itemsRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category;

    if (category) {
      const items = await Item.find({ category })
        .select('_id, title price image')
        .populate({
          path: 'category',
          select: '-_id category',
        });

      res.send(items);
    }

    const results = await Item.find()
      .select('_id, title price image')
      .populate({
        path: 'category',
        select: '-_id category',
      });

    res.send(results);
  } catch (e) {
    next(e);
  }
});
export default itemsRouter;
