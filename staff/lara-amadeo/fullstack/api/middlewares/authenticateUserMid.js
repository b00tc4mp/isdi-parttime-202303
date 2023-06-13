const {  authenticateUser } = require('../logic')

module.exports = function authenticateUserMid(req, res) {
        const { email, password} = req.body

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(200).json({ userId })
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
}