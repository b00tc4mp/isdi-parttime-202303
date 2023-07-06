const { retrievePlaygrounds } = require('../logic/retrievePlaygrounds')

module.exports = (req, res) => {
    try {
        retrievePlaygrounds()
            .then(playgrounds => res.status(200).send(playgrounds))
            .catch(error => res.status(400).json({ error: error.message })
            )
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}