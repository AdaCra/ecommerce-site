class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.errorCode = statusCode;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;