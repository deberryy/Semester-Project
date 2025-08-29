const asyncHandler = require('express-async-handler')

// @desc   Get goals
// @route  GET /api/goals
// @access Private

const getGoals = asyncHandler (async(req, res) => {
    res.status(200).json({message: 'Get goals'})
})

// @desc   Set goal
// @route  POST /api/goal
// @access Private

const setGoals = asyncHandler(async(req, res) => {

    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
        
    }

    res.status(200).json({message: 'Get goals'})
})

// @desc   Update goal goal
// @route  update /api/goals/:id
// @access Private

const updateGoal = asyncHandler (async(req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}` })
})

// @desc   Delete goal
// @route  delete /api/goals/:id
// @access Private

const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})






module.exports = { 
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
    

}