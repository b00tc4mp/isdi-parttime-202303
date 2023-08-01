const { createMeal } = require('../logic')
const { handleErrors } = require('../helpers')
const { retrieveToken } = require('../helpers')

module.exports = handleErrors((req, res) => {

    const { images, title, description, categories, ingredients, bestBefore, price } = req.body

    const userId = retrieveToken(req)

    return createMeal(userId, images, title, description, categories, ingredients, bestBefore, price)
        .then(() => res.status(201).json())
})