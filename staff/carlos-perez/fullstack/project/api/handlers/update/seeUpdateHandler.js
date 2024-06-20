const { seeUpdate } = require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const adminId = extractUserId(req)
    const { updateId } = req.params

    return seeUpdate(adminId, updateId)
        .then(update => res.json(update))
})