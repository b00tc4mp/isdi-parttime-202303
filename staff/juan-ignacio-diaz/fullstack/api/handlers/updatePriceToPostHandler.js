const { updatePriceToPost } = require('../logic')

const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { postId } = req.params
    const { price } = req.body

    const promise = updatePriceToPost(userId, postId, price)

    return (async () => { 
        await promise
        
        res.status(204).send()
    })()
})