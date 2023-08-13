const { reviewProductTypes } = require('../../../logic')

const { extractUserId, handleErrors } = require('../../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)  
    const { listId } = req.params

    const promise = reviewProductTypes(listId, userId)

    return (async () => { 
        const types = await promise
        
        res.json(types)
    })()
})