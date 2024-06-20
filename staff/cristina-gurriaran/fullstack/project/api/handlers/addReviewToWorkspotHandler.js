const { extractUserId, handleErrors } = require('./helpers')
const { addReviewToWorkspot } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { workspotId } = req.params

    const { text } = req.body

    const promise = addReviewToWorkspot(userId, workspotId, text)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})