const { retrievePlaygroundById } = require('../../logic/playgrounds')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { playgroundId } = req.params

    return retrievePlaygroundById(userId, playgroundId)
        .then(playground => res.status(200).send(playground))
})