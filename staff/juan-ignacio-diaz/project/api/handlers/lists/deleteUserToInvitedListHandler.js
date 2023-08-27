const { deleteUserToInvitedList } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { listId, contatcId } = req.params

    const promise = deleteUserToInvitedList(listId, userId, contatcId)

    return (async () => { 
        await promise
        
        res.status(204).send()
    })()
})