const { registerUser } = require('../logic')


module.exports = (req, res) => {
    try {
        const { name, email, password, repeatPassword } = req.body

        registerUser(name, email, password, repeatPassword, error => {
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