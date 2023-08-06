const { handleErrors } = require('../helpers')
const { removeMealFromCart } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { mealId } = req.params

    const userId = retrieveToken(req)

    return removeMealFromCart(userId, mealId)
        .then(() => res.status(204).send())
})