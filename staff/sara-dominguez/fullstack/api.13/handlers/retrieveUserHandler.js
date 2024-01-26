const { retrieveUser } = require('../logic')
const { extractUserId } = require('./helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        retrieveUser(userId)
            .then(user => res.json(user))
            .catch(error => {
                let status = 500

                if (error instanceof ExistenceError)
                    status = 404

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError)
            status = 406

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