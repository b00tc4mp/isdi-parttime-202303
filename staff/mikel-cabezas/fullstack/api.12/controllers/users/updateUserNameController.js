const { updateUserName } = require('../../logic/users')
const { extractToken } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const token = extractToken(req)

        const payload = jwt.verify(token, process.env.SECRET)

        const { sub: userId } = payload

        const { name } = req.body

        updateUserName(userId, name)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}