const { reviewMessages } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)  
    const { listId } = req.params

    const promise = reviewMessages(listId, userId)

    return (async () => { 
        const chat = await promise
        
        res.json(chat)
    })()
})