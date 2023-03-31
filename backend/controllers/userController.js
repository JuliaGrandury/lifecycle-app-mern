const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { validateIdentifier } = require('../utils/authIdentifier')

// @desc Register new user
// @route POST /api/v1/users
// @acces Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if the user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create the user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate a user on login
// @route POST /api/v1/users/login
// @acces Public
const loginUser = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body
    const identifierType = validateIdentifier(identifier)
    let user;

    if (identifierType === 'email') {
        user = await User.findOne({ email: identifier })
    }
    else if (identifierType === 'username') {
        user = await User.findOne({ username: identifier })
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user's data
// @route GET /api/v1/users/me
// @acces Private
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Function to Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
}