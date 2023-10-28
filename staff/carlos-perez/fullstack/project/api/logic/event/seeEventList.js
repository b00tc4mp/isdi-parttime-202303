//const { validators: { validateId }, errors: { AuthError} } = require('com')
const { Administrator, Event } = require('../../data/models')

module.exports = (adminId) => {
    return Event.find().lean()
        .then(events => { return events })
}