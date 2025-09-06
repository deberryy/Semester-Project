const asyncHandler = require('express-async-handler')
const Payment = require('../models/paymentModel')

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Private
const createPayment = asyncHandler(async (req, res) => {
    const { cardNumber, cardHolderName, expiryDate, cvv } = req.body

    if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
        res.status(400)
        throw new Error('Please fill in all payment details')
    }

    const payment = await Payment.create({
        user: req.user._id,
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv
    })

    res.status(201).json(payment)
})

// @desc    Get all payments for the logged-in user
// @route   GET /api/payments
// @access  Private
const getPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({ user: req.user._id })
    res.status(200).json(payments)
})

// @desc    Update a payment
// @route   PUT /api/payments/:id
// @access  Private
const updatePayment = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id)

    if (!payment) {
        res.status(404)
        throw new Error('Payment not found')
    }

    // Check if the logged-in user owns this payment
    if (payment.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized to update this payment')
    }

    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPayment)
})

// @desc    Delete a payment
// @route   DELETE /api/payments/:id
// @access  Private
const deletePayment = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id)

    if (!payment) {
        res.status(404)
        throw new Error('Payment not found')
    }

    // Check if the logged-in user owns this payment
    if (payment.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized to delete this payment')
    }

    await Payment.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Payment deleted successfully' })
})

module.exports = {
    createPayment,
    getPayments,
    updatePayment,
    deletePayment,
}