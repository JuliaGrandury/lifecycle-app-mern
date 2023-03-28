const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    // Checking the authorization header (where token is stored)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Getting the token from the header starting with Bearer
            token = req.headers.authorization.split(' ')[1]
            // Verify the token retrieved
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get the user from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')   
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }