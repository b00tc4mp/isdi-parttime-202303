const { registerUser } = require('../logic')

module.exports = function registerUserMid(req, res) {

        const user = req.body
        console.log(user)

        try {
            registerUser(user.username, user.email, user.password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(201).send()
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
}