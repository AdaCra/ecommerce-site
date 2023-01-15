const Order = require ('../models/order');
const Product = require ('../models/products');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create an order  --via--  /api/v1/order/new
exports.newOrder = catchAsyncErrors( async ( req, res, next ) => {
    const {
        orderItems,
        shippingInfo,
        orderValue,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        orderValue,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});

// Get single order by ID  --via--  /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors ( async ( req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    
    if (!order /*Check order exists.*/){ 
        return next( new ErrorHandler( "Order Number does not exist", 404 )
        );
    }
    
    if (order.user.id !== req.user.id /*Check order exists and corresponds to logged in user.*/){  
        return next( new ErrorHandler( "This order is not associated with the current User Profile",
            404
          )
        );
      }

    res.status(200).json({
        success: true,
        order
    })
});

// Get all logged in user orders by UserID  --via--  /api/v1/orders/me/:id
exports.myOrders = catchAsyncErrors ( async ( req, res, next) => {
    const orders = await Order.find({user:req.user.id})
    
    // if(!orders) {
    //     return `No orders have been placed by this user profile`
    // }
    // orders.forEach(order => {
    //     if (order.user.id !== req.user.id /*Check orders correspond to logged in user*/){ 
    //         return next(
    //           new ErrorHandler(
    //             "These Orders are not associated with current User Profile.", 404 )
    //         );
    //       }
    // });

    res.status(200).json({
        success: true,
        orders
    })

})