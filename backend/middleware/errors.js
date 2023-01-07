const ErrorHandler = require('../utils/errorHandler.js')

module.exports = (err, req, res, next) => {
    err.statusCode =  err.statusCode || 500;
    if(process.env.NODE_ENV !== 'DEVELOPMENT') {
        let error = {...err}
        error.message = err.message
        //ID not found
        if (err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }
        //Object info missing
        if (err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }
    
    res.status(err.statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error'
     })
    } else {res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }    
}