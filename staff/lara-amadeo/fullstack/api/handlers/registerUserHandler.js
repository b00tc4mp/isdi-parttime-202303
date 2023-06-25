const { registerUser } = require('../logic')

module.exports = function registerUserHandler(req, res) {
    try {
        const { username, email, password } = req.body
        
        registerUser(username, email, password)
            .then(() => res.status(201).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}