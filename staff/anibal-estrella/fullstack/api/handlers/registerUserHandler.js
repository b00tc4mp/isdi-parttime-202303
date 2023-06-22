const { registerUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const { name, email, password, repeatPassword } = req.body

        registerUser(name, email, password, repeatPassword)
            // happy path 😄
            .then(() => res.status(201).send())
            // unhappy path 😢
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}