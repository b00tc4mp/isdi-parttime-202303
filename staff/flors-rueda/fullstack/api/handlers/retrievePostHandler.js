const { retrievePost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {

    try {
        const userAuth = extractUserId(req);

        const { postId } = req.params;

        retrievePost(userAuth, postId)
            .then((userId) => res.json(userId))
            .catch((error) => res.status(400).json({ error: error.message }));

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}