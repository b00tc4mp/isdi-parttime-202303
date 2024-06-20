const { toggleProductToCart } = require('../../../logic')

const { extractUserId, handleErrors } = require('../../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)  
    const { listId, productId } = req.params

    const promise = toggleProductToCart(listId, userId, productId)

    return (async () => { 
        await promise
        
        res.status(204).send()
    })()
})