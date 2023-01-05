const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { getProducts, newProduct } = require('../controller/productController');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);
module.exports = router;