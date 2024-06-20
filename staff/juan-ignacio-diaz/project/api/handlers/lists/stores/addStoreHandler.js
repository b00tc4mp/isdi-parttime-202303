const { addStore } = require('../../../logic')

const { extractUserId, handleErrors } = require('../../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req) 
    const { listId } = req.params
    const { name } = req.body

    const promise = addStore(listId, userId, name)
    
    return (async () => { 
        const store = await promise

        res.json(store)
    })()
})