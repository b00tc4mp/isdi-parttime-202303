const { retrieveUsersList } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { listId } = req.params

    const promise = retrieveUsersList(listId, userId)

    return (async () => {  
        const list = await promise
        
        res.json(list)
    })()
})