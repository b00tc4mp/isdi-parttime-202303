const { addUserToInvitedList } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { listId, contactId } = req.params

    const promise = addUsersToInvitedList(listId, userId, contactId)

    return (async () => { 
        await promise
        
        res.status(201).send()
    })()
})