const { createMessage } = require('../../logic')

module.exports = (req, res) => {
    try {
        const { author, email, title, text, status } = req.body

        createMessage(author, email, title, text, status)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}