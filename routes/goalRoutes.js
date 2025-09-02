const express = require('express')
const router = express.Router()
const { getGoals, setGoals, updateGoal, deleteGoal } = require('../controllers/getControllers.js')

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(updateGoal).delete(deleteGoal)


module.exports = router  