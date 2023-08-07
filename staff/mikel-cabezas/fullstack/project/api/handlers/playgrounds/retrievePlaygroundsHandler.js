const { retrievePlaygrounds } = require('../../logic/playgrounds')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return retrievePlaygrounds(userId)
        .then(posts => res.status(200).send(posts))

})