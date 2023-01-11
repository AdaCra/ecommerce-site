const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authoriseRoles } = require('../middleware/auth')


const { 
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword,
    getCurrentUser,
    updateUserPassword,
    updateUserProfile,
    returnAllUsers,

 } = require('../controller/authController')


/*      USERS       */
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getCurrentUser);
router.route('/password/update').put(isAuthenticatedUser, updateUserPassword);
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile);


/*      ADMIN       */
router.route('/admin/users').get(isAuthenticatedUser, authoriseRoles('admin'), returnAllUsers)




module.exports = router;