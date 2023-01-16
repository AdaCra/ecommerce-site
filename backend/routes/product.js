const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authoriseRoles } = require('../middleware/auth')

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct,

    createProductReview,
    getAllProductReviews,
    deleteReview
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

// Product Reviews
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews')
        .get(isAuthenticatedUser, getAllProductReviews)
        .delete(isAuthenticatedUser, deleteReview)

module.exports = router;