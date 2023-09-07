const { extractUserId, handleErrors } = require('./helpers')
const { updateWorkspot } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { workspotId } = req.params

    const { image, name, location, description, category, features } = req.body
    
    debugger 
    
    const promise = updateWorkspot(userId, workspotId, image, name, location, description, category, features)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})