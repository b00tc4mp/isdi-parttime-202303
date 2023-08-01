const { updateUserImage } = require('../../logic/users')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { image } = req.body
    debugger
    return updateUserImage(userId, image)
        .then(() => res.status(204).send())
})