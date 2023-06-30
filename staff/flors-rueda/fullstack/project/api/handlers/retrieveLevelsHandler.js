const { retrieveLevels } = require('../logic')

module.exports = (req, res) => {
    try {

        retrieveLevels()
            .then((levels) => res.json(levels))
            .catch((error) => res.status(400).json({ error: error.message }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}