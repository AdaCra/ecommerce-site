const express = require('express');
const route = require('../app');
const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controller/productController');

const { isAuthenticatedUser, authoriseRoles } = require('../middleware/auth')
// gets
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

// posts
router.route('/admin/product/new').post(newProduct);

//puts & delete
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, updateProduct)
    .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;