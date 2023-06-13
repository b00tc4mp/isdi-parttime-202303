const { toggleFav } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userAuth = extractUserId(req)

        const { postId } = req.params

        toggleFav(postId, userAuth, (error) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(204).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}