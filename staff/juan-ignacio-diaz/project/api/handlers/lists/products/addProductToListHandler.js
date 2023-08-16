const { addProductToList } = require('../../../logic')

const { extractUserId, handleErrors } = require('../../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)  

    const { listId } = req.params

    const { name, howMany, stores, type, comment } = req.body

    const promise = addProductToList(listId, userId, name, howMany, stores, type, comment)

    return (async () => { 
        await promise
        
        res.status(201).send()
    })()
})