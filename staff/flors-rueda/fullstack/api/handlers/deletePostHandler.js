const { deletePost } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userAuth = extractUserId(req);
        const { postId } = req.params;

        deletePost(userAuth, postId)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }));

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}