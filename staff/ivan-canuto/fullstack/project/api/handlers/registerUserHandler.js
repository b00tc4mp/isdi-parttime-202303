const registerUser = require("../logic/registerUser")
const { handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
  const { name, username, email, password } = req.body

  const promise = registerUser(name, username, email, password)

  return (async () => {
    await promise

    res.status(201).send()
  })()
})
