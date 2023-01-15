const express  = require('express');
const router = express.Router();

const {
    /*users*/
    newOrder,
// ---
    getSingleOrder,
    myOrders,
    /*admin*/
} = require('../controller/orderController')
const { isAuthenticatedUser, authoriseRoles } = require('../middleware/auth');

/*      USERS       */
router.route('/order/new').post(isAuthenticatedUser, newOrder);
// ---
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me/').get(isAuthenticatedUser, myOrders);
/*      ADMIN       */


module.exports = router;
