const { markProductAsPurchased } = require('../../../logic')

const { extractUserId, handleErrors } = require('../../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)  
    const { listId, productId } = req.params
    const { price , stores } = req.body

    const promise = markProductAsPurchased(listId, userId, productId, price, stores)

    return (async () => { 
        await promise
        
        res.status(204).send()
    })()
})