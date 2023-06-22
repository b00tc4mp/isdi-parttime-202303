const { authenticateUser } = require('../logic')

module.exports = (req, res) => {
    try {
        const { email, password } = req.body

        authenticateUser(email, password)
            .then(userId => res.json(userId))

            //this receives the error from the authenticateUser function
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}