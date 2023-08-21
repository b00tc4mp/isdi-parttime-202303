const { createNewCharacter } = require('../logic')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
        const { characterName, avatar } = req.body

        return createNewCharacter(characterName, avatar)
            .then(() => res.status(201).send())
})