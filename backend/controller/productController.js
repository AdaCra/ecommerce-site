const Product = require('../models/products')

// create new product @ /api/v1/admin/product/new
exports.newProduct = async(req,res,next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    });
}

// get all products from api/v1/products
exports.getProducts = async (req,res,next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        message:'data to follow',
        products
    });
}

// get single product from api/v1/products via _id
exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    res.status(200).json({
        success: true,
        product
    });
}

// get single product from api/v1/admin/products/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    });
}