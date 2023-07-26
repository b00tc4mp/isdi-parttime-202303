const { deleteUserContact } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')


module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { contactId } = req.params

    const promise = deleteUserContact(userId, contactId)

    return (async () => { 
        await promise
        
        res.status(204).send()
    })()
})