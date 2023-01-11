const ErrorHandler = require('../utils/errorHandler.js')

module.exports = (err, req, res, next) => {
    err.statusCode =  err.statusCode || 500;

    if(process.env.NODE_ENV !== 'DEVELOPMENT') {
        let error = {...err}

        error.message = err.message

        // Mongoose Object ID Error
        if (err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Mongoose Validation Error
        if (err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        // Mongoose duplicate account reg errors
        if (err.code === 11000) {
            const message = `This ${Object.keys(err.keyValue)} already exists. Please check your ${Object.keys(err.keyValue)} or log in`
            error = new ErrorHandler(message, 400)
        }

        // JWToken Error
        if (err.name === 'JsonWebTokenError'){
            const message = 'Your Web Token is invalid, Please try again';
            error = new ErrorHandler(message, 400)
        }

        // JWToken Expired
        if (err.name === 'TokenExpiredError'){
            const message = 'Your Web Token has expired';
            error = new ErrorHandler(message, 400)
        }
    


    res.status(err.statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error'
     })

    //  developer mode
    } else {res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }    
}