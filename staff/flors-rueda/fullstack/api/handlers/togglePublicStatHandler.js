const { togglePublicStat } = require('../logic');
const { extractUserId } = require('../helpers');

module.exports = (req, res) => {
    try {
        const userAuth = extractUserId(req);

        const { postId } = req.params;

        togglePublicStat(postId, userAuth)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}