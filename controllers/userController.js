const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth, phoneNumber, role } = req.body

    // Check for all fields
    if (!firstName || !lastName || !email || !password || !dateOfBirth || !phoneNumber) {
        res.status(400)
        throw new Error('Please fill in all the required fields')
    }

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        phoneNumber,
        role: role || 'user' // Default to 'user' if not specified
    })

    if (user) {
        // Generate a JWT token for the new user
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        // Generate a JWT token for the user
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

module.exports = {
    registerUser,
    loginUser
}