const { addEmail } = require('../../logic')

module.exports = (req, res) => {
    try {
        const { email } = req.body
        addEmail(email)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}