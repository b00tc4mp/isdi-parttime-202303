const { readMessage } = require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const adminId = extractUserId(req)

    const { messageId } = req.params

    return readMessage(adminId, messageId)
        .then(message => res.json(message))
})