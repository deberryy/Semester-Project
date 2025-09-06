const express = require('express')
const router = express.Router()
const {
    createPayment,
    getPayments,
    updatePayment,
    deletePayment
} = require('../controllers/paymentControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, createPayment).get(protect, getPayments)
router.route('/:id').put(protect, updatePayment).delete(protect, deletePayment)

module.exports = router