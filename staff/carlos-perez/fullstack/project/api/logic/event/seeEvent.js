const { validators: { validateId }, errors: { ExistenceError} } = require('com')
const { Administrator, Event } = require('../../data/models')

module.exports = (adminId, eventId) => {
    validateId(eventId, 'event id')
        return Event.findById(eventId)
            .then(event => {
                if (!event){throw new ExistenceError('This event does not exist')}
                return event;
                })
}