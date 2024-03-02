import express from 'express';
import Category from '../models/Category';

const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res, next) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (e) {
    next(e);
  }
});

export default categoryRouter;
