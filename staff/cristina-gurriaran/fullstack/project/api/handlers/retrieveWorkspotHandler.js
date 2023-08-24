const { extractUserId, handleErrors } = require('./helpers')
const { retrieveWorkspot } = require('../logic')

module.exports = handleErrors((req,res) => {
    const userId = extractUserId(req)

    const { workspotId } = req.params

    const promise = retrieveWorkspot(userId, workspotId)

    return (async () => {
        const workspot = await promise

        res.json(workspot)
    })()
})