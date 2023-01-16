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
    
    if (order.user.id !== req.user.id && req.user.role !== 'admin'/*Check order exists and corresponds to logged in user.*/){  
        return next( new ErrorHandler( "Current User Profile does not match",
            403
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
    
    if(!orders) {
        return `No orders have been made by this user profile`
    }
    
    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders - ADMIN  --via--  /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors ( async ( req, res, next) => {
    const orders = await Order.find()
    
    let orderCount = 0;
    let totalValueOfOrders = 0;
    orders.forEach(order => {
        totalValueOfOrders += order.orderValue.totalPrice;
        orderCount ++
    })
    if(!orders) {
        return `No orders found within these parameters`
    }
    
    res.status(200).json({
        success: true,
        orderCount,
        totalValueOfOrders,
        orders
    })
})

// Update and Process orders - ADMIN  --via--  /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors ( async ( req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler(`Order number ${req.params.id} was successfully Delivered`, 400))
    }
    
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity) /*---Function Below---*/
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

/*---updateStock Function---*/ 
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}

// Delete orders - Admin  --via--  /api/v1/order/:id
exports.deleteOrder = catchAsyncErrors ( async ( req, res, next) => {
    const order = await Order.findById(req.params.id)
    
    if(!order) {
        return next (new ErrorHandler(`Order number does not exist.`, 404))
    }
    
    await order.remove()

    res.status(200).json({
        success: true,
        message: `Order ${req.params.id}has been Deleted`
    })
})