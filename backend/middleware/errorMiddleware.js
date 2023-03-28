const errorHandler = (err, req, res, next) => {

    // If there's a status code, use it, else, it's a server error
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    // To only show the stack line numbers of the error if in development mode (not production mode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = {
    errorHandler,
}