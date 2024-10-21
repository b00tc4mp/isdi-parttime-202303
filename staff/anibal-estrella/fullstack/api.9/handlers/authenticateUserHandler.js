const { authenticateUser } = require('../logic')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    debugger
    try {
        const { email, password } = req.body
        //the handle calls this logic
        authenticateUser(email, password)
            .then(userId => {
                // load the token in the payload for that userid 
                const payload = { sub: userId }
                // sign it with the secret phrase and returns a hash in a json
                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
                // return the token PAYLOAD
                res.json(token)
            })

            //this receives the error from the authenticateUser function
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}