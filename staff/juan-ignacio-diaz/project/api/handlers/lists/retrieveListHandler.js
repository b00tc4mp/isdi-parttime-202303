const { retrieveList } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { listId } = req.params

    const promise = retrieveList(listId, userId)

    return (async () => {  
        const list = await promise
        
        res.json(list)
    })()
})