const Product = require("../models/products");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const APIFeatures = require('../utils/apiFeatures')


/* ------ GENERAL ------*/
// get all products via api/v1/products (...?keyword=...)
exports.getProducts = catchAsyncErrors (async (req, res, next) => {
  let resultsShownPerPage = 4
  const productCount = await Product.countDocuments()
  const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultsShownPerPage)
  
  
  const products = await apiFeatures.query;
  const pageNumber = parseInt(apiFeatures.queryStr.page)
  const pageStartNumber = ((pageNumber - 1)*resultsShownPerPage) + 1
  const pageEndNumber = pageStartNumber + products.length - 1

  res.status(200).json({
    success: true,
    pageNumber,
    count: products.length,
    showing: `${pageStartNumber} to ${pageEndNumber}`,
    productCount,
    message: "data to follow",
    products,
  });
});

// get single product via api/v1/products via _id
exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
    }
  res.status(200).json({
    success: true,
    product,
  });
})



/* ------ ADMIN ------*/
// create new product via /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {

  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// edit product from api/v1/admin/products/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
    }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product via api/v1/admin/products/:id
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
    }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});



