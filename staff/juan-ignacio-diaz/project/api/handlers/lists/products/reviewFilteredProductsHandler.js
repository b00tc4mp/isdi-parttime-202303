const { reviewFilteredProducts } = require('../../../logic')

const { extractUserId, handleErrors } = require('../../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)    
    const { listId } = req.params
    const { filter, order } = req.body

    const promise = reviewFilteredProducts(listId, userId, filter, order)

    return (async () => { 
        const products = await promise
        
        res.json(products)
    })()
})