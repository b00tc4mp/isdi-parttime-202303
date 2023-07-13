const { registerAdditionalInfo } = require('../logic')
const { handleErrors } = require('../helpers')
const { retrieveToken } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { description, tags, location, availability } = req.body

    const userId = retrieveToken(req)

    return registerAdditionalInfo(userId, description, tags, location, availability)
        .then(() => res.status(204).send())
})