const { addCommentToChat } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    
    const { listId } = req.params

    const { text } = req.body

    const promise = addCommentToChat(listId, userId, text)
    
    return (async () => { 
        await promise
        
        res.status(201).send()
    })()
})