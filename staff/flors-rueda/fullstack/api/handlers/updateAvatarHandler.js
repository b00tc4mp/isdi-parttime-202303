const { extractUserId } = require('../helpers');
const { updateAvatar } = require('../logic');

module.exports = (req, res) => {
    try {
        const { newSrc } = req.body;
        const userAuth = extractUserId(req);

        updateAvatar(newSrc, userAuth)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}