const { extractUserId } = require('../helpers');
const { updateName } = require('../logic');

module.exports = (req, res) => {
    try {
        const { name } = req.body;
        const userAuth = extractUserId(req);

        updateName(name, userAuth)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}