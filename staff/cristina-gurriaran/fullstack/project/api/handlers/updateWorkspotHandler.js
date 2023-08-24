const { extractUserId, handleErrors } = require('./helpers')
const { updateWorkspot } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { workspotId } = req.params

    const { image, name, location, description, type, features } = req.body

    const promise = updateWorkspot(userId, workspotId, image, name, location, description, type, features)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})