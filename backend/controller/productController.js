const Product = require("../models/products");

const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const APIFeatures = require('../utils/apiFeatures')


/* ------ GENERAL ------*/
// get all products  --via--  api/v1/products (...?keyword=...)
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

// get single product  --via--  api/v1/products/_id
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
// create new product  --via--  /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {

  req.body.user = req.user.id

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

// delete product  --via--  api/v1/admin/products/:id
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


// Create Product Review  --via--  api/v1/review
exports.createProductReview = catchAsyncErrors( async ( req, res, next) => {
  const { rating, comment, productId } = req.body

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId)
  const isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  )
  if (isReviewed){
    product.reviews.forEach(review => {
      if(review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    })

  }else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true
  })
})

// Get all product reviews  --via--  api/v1/reviews
exports.getAllProductReviews = catchAsyncErrors ( async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

// Delete product reviews  --via--  api/v1/review
exports.deleteReview = catchAsyncErrors ( async (req, res, next) => {
  
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

  const numOfReviews = reviews.length;
  
  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
});

  res.status(200).json({
    success: true,
  })
})