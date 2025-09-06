const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cardNumber: {
        type: String,
        required: [true, 'Please add the card number']
    },
    cardHolderName: {
        type: String,
        required: [true, 'Please add the card holder name']
    },
    expiryDate: {
        type: String,
        required: [true, 'Please add the expiry date (MM/YY)']
    },
    cvv: {
        type: String,
        required: [true, 'Please add the CVV']
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const Payment = mongoose.model('Payment', PaymentSchema)

module.exports = Payment