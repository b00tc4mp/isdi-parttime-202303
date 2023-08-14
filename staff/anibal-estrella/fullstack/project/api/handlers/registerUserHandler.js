// the HANDLERS call the Logic and the Logic calls Mongo
// all error messages are for developing purposes none of them are sent to the CLIENT/front
const { registerUser } = require('../logic')
const jwt = require('jsonwebtoken')

// const { errors: { DuplicityError, ContentError } } = require('com')

module.exports = (req, res) => {
    try {
        const { name, nickName, email, password, city } = req.body
        res.status(200).send({ name, nickName, email, password, city });

        // registerUser(name, email, password)
        // happy path 😄
        // .then(() => res.status(201).send())
        // unhappy path 😢
        // .catch(error => {
        //     let status = 500

        // if (error instanceof DuplicityError)
        //     status = 409

        //     res.status(status).json({ error: error.message })
        // })

    } catch (error) {
        let status = 500

        // if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError)
        //     status = 406

        res.status(status).json({ error: error.message })
    }
}