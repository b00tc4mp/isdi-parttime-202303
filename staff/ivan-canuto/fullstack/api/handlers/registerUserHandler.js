const registerUser = require("../logic/registerUser")
const { errors : { DuplicityError, ContentError } } = require('com')
const { handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
  const { name, email, password } = req.body

  return registerUser(name, email, password)
    .then(() => res.status(201).send())
})
