const { registerUser } = require('../logic')


module.exports = (req, res) => {
    try {
        const { name, email, password } = req.body
        registerUser(name, email, password, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(201).send() //el 201 no devuelve datos, solo indica q el proceso ha sido ok
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}