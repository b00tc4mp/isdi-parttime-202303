const { addUserContact } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { contactId } = req.params

    const promise = addUserContact(userId, contactId)

    return (async () => { 
        await promise
        
        res.status(201).send()
    })()
})