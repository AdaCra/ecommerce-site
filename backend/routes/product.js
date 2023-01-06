const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controller/productController');

// gets
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

// posts
router.route('/admin/product/new').post(newProduct);

//puts
router.route('/admin/product/:id')
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;