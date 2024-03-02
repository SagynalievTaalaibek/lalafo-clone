import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Item from './models/Item';
import User from './models/User';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop....`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['categories', 'items', 'users'];

  for (const collectionsName of collections) {
    await dropCollection(db, collectionsName);
  }

  const category = await Category.create([
    { category: 'Computers' },
    { category: 'Phone' },
    { category: 'Clothes' },
    { category: 'Cars' },
  ]);

  const seller = await User.create([
    {
      username: 'sagynaliev@gmail.com',
      displayName: 'Taalaiebek',
      phone: '+996505601100',
      password: '1234',
      token: crypto.randomUUID(),
    },
    {
      username: 'john@gmail.com',
      displayName: 'John',
      phone: '+99650511111',
      password: '1234',
      token: crypto.randomUUID(),
    },
  ]);

  await Item.create([
    {
      category: category[1],
      seller: seller[0]._id,
      title: 'New Iphone',
      description: 'New Iphone 15',
      price: '1000',
      image: 'fixtures/iphone.jpeg',
    },
    {
      category: category[3],
      seller: seller[0]._id,
      title: 'New Car',
      description: 'New Car Audi r8',
      price: '1000000',
      image: 'fixtures/audir8.jpg',
    },
    {
      category: category[0],
      seller: seller[1]._id,
      title: 'New Macbook',
      description: 'New Macbook PRO M3',
      price: '30000',
      image: 'fixtures/macbook.jpg',
    },
    {
      category: category[2],
      seller: seller[1]._id,
      title: 'Green Clothes',
      description: 'New Clothes',
      price: '1000',
      image: 'fixtures/tshirt.png',
    },
  ]);

  await db.close();
};

void run();
