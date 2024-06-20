const { seeEventList } = require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const adminId = extractUserId(req)

    return seeEventList(adminId)
        .then(events => res.json(events))
})