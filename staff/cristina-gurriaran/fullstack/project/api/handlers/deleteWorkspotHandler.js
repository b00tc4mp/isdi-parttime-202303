const { extractUserId, handleErrors } = require('./helpers')
const { deleteWorkspot } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { workspotId } = req.params

    const promise = deleteWorkspot(userId, workspotId)

    return (async () => {
        await promise

        res.status(204).send()
    })()
})