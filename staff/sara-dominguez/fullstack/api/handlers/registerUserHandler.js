const { registerUser } = require('../logic')
const { handleErrors } = require('./helpers')


// module.exports = handleErrors((req, res) => {
//     const { name, email, password } = req.body

//     return registerUser(name, email, password)
//         .then(() => res.status(201).send())
// })

module.exports = handleErrors((req, res) => {
    const { name, email, password } = req.body

    const promise = registerUser(name, email, password)

    return (async () => {
        await promise

        res.status(201).send()
    })()
})




