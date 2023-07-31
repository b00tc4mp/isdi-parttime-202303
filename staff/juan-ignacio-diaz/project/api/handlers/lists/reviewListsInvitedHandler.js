const { reviewListsInvited } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const promise = reviewListsInvited(userId)

    return (async () => {  
        const lists = await promise
        
        res.json(lists)
    })()
})