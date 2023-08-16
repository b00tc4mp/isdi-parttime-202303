const { copyToNewList } = require('../../logic')

const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { listId } = req.params

    const { name, dateToEnd } = req.body

    const promise = copyToNewList(listId, userId, name, new Date(dateToEnd))

    return (async () => { 
        await promise
        
        res.status(201).send()
    })()
})