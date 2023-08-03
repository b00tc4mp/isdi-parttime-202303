const { handleErrors } = require('../helpers')
const { addMealToCart } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { mealAmount } = req.body

    const { mealId } = req.params

    const userId = retrieveToken(req)

    return addMealToCart(userId, mealId, mealAmount)
        .then(() => res.status(204).send())
})