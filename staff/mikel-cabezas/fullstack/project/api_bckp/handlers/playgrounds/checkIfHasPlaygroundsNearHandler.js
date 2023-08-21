const { checkIfHasPlaygroundsNear } = require('../../logic/playgrounds')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { userLocation } = req.body
    return checkIfHasPlaygroundsNear(userId, userLocation)
        .then(() => {
            if (playgrounds) res.status(409).send()
            else res.status(200).send()
        })


})