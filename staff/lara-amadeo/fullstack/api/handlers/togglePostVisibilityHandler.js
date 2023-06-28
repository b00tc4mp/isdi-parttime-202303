const { retrieveToken } = require('../helpers')
const { togglePostVisibility } = require('../logic')

module.exports = (req, res) => {
    try {
        const { postId } = req.params

        const userId = retrieveToken(req)

        togglePostVisibility(userId, postId)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}