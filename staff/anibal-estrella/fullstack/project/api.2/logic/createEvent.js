const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateUrl, validateId } } = require('com')

const { User, Event } = require('../data-project/models.js')

/**
 * Creates a new  and updates the events DB
 * @param {string} userId the user's ID
 * @param {string} image the Event's image
 * @param {string} text  the Event's text
 */

module.exports = (userId, image, text, lineUp, dates) => {
    validateId(userId, 'user id')
    validateUrl(image, 'Image URL')
    validateText(text, 'Event text')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} does not exist`)

            return Event.create({
                author: userId,
                image,
                text
            })
        })
        .then(() => { })
}


