const { updateUserMode } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { mode } = req.body

    const promise = updateUserMode(userId, mode)

    return (async () => { 
        await promise
        
        res.status(204).send()
    })()
})