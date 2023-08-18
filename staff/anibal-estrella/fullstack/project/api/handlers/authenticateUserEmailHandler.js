const { authenticateUserEmail } = require('../logic')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const { email } = req.body
    console.log(req.body);

    return authenticateUserEmail(email)
        .then(userId => {
            res.status(200).send(`A user with that ${email} is registered.`)
        })
})
