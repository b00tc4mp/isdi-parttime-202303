const { authenticateUser } = require('../../logic/users')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        const { email, password } = req.body

        authenticateUser(email, password)
            .then(userId => {
                const payload = { sub: userId }

                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '5000s' })

                res.json(token)
            })
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}