const { seeEvent } = require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const adminId = extractUserId(req)
    const { eventId } = req.params

    return seeEvent(adminId, eventId)
        .then(event => res.json(event))
})