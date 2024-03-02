import { model, Schema, Types } from 'mongoose';
import User from './User';
import Category from './Category';

const ItemSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (userId: Types.ObjectId) => {
        const user = await User.findById(userId);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (id: Types.ObjectId) => {
        const category = await Category.findById(id);
        return Boolean(category);
      },
      message: 'Category does not exist!',
    },
  },
});

const Item = model('Item', ItemSchema);
export default Item;
