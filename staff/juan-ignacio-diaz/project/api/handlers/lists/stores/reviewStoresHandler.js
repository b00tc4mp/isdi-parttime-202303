const { reviewStores } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)  
    const { listId } = req.params

    const promise = reviewStores(listId, userId)

    return (async () => { 
        const stores = await promise
        
        res.json(stores)
    })()
})