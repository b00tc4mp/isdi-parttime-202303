const { seeUpdateList } = require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const adminId = extractUserId(req)

    return seeUpdateList(adminId)
        .then(updates => res.json(updates))
})