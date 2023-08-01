const { addUsersToInvitedList } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { listId } = req.params
    const { contactId } = req.params

    const promise = addUsersToInvitedList(listId, userId, contactId)

    return (async () => { 
        await promise
        
        res.status(201).send()
    })()
})