const { reviewProduct } = require('../../../logic')

const { extractUserId, handleErrors } = require('../../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)    
    const { listId, productId } = req.params

    const promise = reviewProduct(listId, userId, productId)

    return (async () => { 
        const products = await promise
        
        res.json(products)
    })()
})