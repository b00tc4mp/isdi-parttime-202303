const { retrieveUser } = require('../logic')
const { extractToken } = require('../helpers')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    try {
        //traigo el token del bearer
        const token = extractToken(req)

        //verifico el token con jwt.verify
        const payload = jwt.verify(token, process.env.SECRET)

        //extraigo el userId para poder continuar con las lógicas, que no se ven modificadas.
        const { sub: userId } = payload

        retrieveUser(userId)
            .then(user => res.json(user))
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }



    // try {
    //     const userId = extractToken(req)

    //     retrieveUser(userId, (error, user) => {
    //         if (error) {
    //             res.status(400).json({ error: error.message })

    //             return
    //         }
    //         // res.status(200).json(user)
    //         res.json(user)
    //     })
    // } catch (error) {
    //     res.status(400).json({ error: error.message })
    // }
}