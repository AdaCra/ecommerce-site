const Product = require('../models/products.js');
const dotenv = require('dotenv')
const connectDatabase = require('../config/database.js')
const products = require('../data/product')

//Setting dotenv file
dotenv.config ({ path: 'backend/config/config.env'})


connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('products are deleted');

    await Product.insertMany(products)
    console.log('products are inserted');

    process.exit();

  } catch(error) {
    console.log(error.message);
    process.exit();
  }
}

seedProducts();