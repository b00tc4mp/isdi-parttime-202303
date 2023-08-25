const { extractUserId, handleErrors } = require('./helpers')
const { toggleLikeWorkspot } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { workspotId } = req.params

    const promise = toggleLikeWorkspot(userId, workspotId)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})