const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authoriseRoles } = require('../middleware/auth')

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
router.route('/admin/product/new').post(isAuthenticatedUser, authoriseRoles('admin'), newProduct);


//puts & delete
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authoriseRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authoriseRoles('admin'), deleteProduct);

module.exports = router;