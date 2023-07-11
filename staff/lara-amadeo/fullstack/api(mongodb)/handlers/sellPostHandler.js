const { retrieveToken } = require('../helpers')
const { sellPost } = require('../logic')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { postId } = req.params

    const { newPrice } = req.body

    const userId = retrieveToken(req)

    return sellPost(userId, postId, newPrice)
        .then(() => res.status(201).send())

})