const { seeMessageList } = require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const adminId = extractUserId(req)

    return seeMessageList(adminId)
        .then(messages => res.json(messages))
})