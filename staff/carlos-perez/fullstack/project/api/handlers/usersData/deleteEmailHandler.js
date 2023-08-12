const { deleteEmail } = require('../../logic')

module.exports = (req, res) => {
    try {
        const { email } = req.body
        deleteEmail(email)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}