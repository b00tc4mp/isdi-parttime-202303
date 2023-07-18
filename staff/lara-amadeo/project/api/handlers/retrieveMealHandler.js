const { retrieveToken } = require('../helpers')
const { retrieveMeal } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)
    const { mealId } = req.params

    return retrieveMeal(userId, mealId)
        .then(meal => res.status(200).json(meal))

})