const { retrieveFavoritePosts } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userAuth = extractUserId(req);

        retrieveFavoritePosts(userAuth, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.json(posts);
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}