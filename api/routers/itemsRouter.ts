import express from 'express';
import mongoose, { Types } from 'mongoose';
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

itemsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const results = await Item.findById(_id).populate({
      path: 'category seller',
      select: '_id category phone displayName',
    });

    res.send(results);
  } catch (e) {
    next(e);
  }
});

itemsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user?._id;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }

    if (!item.seller.equals(userId)) {
      return res.status(403).send({ error: 'You cannot delete items!' });
    }

    await Item.deleteOne({ _id: id });
    res.send({ message: 'Item deleted!' });
  } catch (e) {
    next(e);
  }
});

export default itemsRouter;
