const { updateUserImage } = require('../../logic/users')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { newImage } = req.body

    return updateUserImage(userId, newImage)
        .then(() => res.status(204).send())
})