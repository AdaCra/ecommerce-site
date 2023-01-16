const express  = require('express');
const router = express.Router();

const {
    /*users*/
    newOrder,
// ---
    getSingleOrder,
    myOrders,
    /*admin*/
    allOrders,
// ---
    updateOrder,
    deleteOrder,
} = require('../controller/orderController')
const { isAuthenticatedUser, authoriseRoles } = require('../middleware/auth');

/*      USERS       */
router.route('/order/new').post(isAuthenticatedUser, newOrder);
// ---
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
/*      ADMIN       */
router.route('/admin/orders').get(isAuthenticatedUser, authoriseRoles('admin'), allOrders);
// ---
router.route('/admin/order/:id')
        .put(isAuthenticatedUser, authoriseRoles('admin'), updateOrder)
        .delete(isAuthenticatedUser, authoriseRoles('admin'), deleteOrder);

module.exports = router;
