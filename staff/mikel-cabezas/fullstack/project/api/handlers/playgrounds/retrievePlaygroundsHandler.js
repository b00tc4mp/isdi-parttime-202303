const { retrievePlaygrounds } = require('../../logic/playgrounds')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { userLocation } = req.body

    return retrievePlaygrounds(userId, userLocation)
        .then(posts => res.status(200).send(posts))

})