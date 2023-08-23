const { reviewFilteredProducts } = require('../../../logic')

const { extractUserId, handleErrors } = require('../../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)    
    const { listId } = req.params
    const { filer, order } = req.body

    const promise = reviewFilteredProducts(listId, userId, filer, order)

    return (async () => { 
        const products = await promise
        
        res.json(products)
    })()
})