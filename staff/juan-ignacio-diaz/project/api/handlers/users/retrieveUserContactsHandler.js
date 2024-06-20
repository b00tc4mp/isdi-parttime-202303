const { retrieveUserContacts } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const promise = retrieveUserContacts(userId)

    return (async () => { 
        const contacts = await promise

        res.json(contacts)
    })()
})