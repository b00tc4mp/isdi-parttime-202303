const { retrieveLevel } = require('../logic')

module.exports = (req, res) => {

    try {

        const { levelId } = req.params;

        retrieveLevel(levelId)
            .then((level) => res.json(level))
            .catch((error) => res.status(400).json({ error: error.message }));

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}