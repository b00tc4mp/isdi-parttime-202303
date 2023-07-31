const { acceptListByUser } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { listId } = req.params

    const promise = acceptListByUser(listId, userId)

    return (async () => { 
        await promise
        
        res.status(204).send()
    })()
})