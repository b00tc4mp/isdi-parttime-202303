const { retrieveToken } = require('../helpers')
const { updateAvatar } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { avatar } = req.body

    const userId = retrieveToken(req)

    return updateAvatar(userId, avatar)
        .then(() => res.status(204).send())
})