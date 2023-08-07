const { addPlayground } = require('../../logic/playgrounds')
const { extractUserId, handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { name, description, sunExposition, elements, images, location } = req.body
    // const { id, author, image, title, text, date, comments, likes, visibility, location } = req.body

    return addPlayground(userId, name, description, sunExposition, elements, images, location)
        .then(() => res.status(201).send())
        .then(res => console.log(res))
        .catch(error => error.message)
})

