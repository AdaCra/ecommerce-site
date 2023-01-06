const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct } = require('../controller/productController');

// gets
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct)

// posts
router.route('/product/new').post(newProduct);
module.exports = router;