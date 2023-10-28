const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { Administrator, Event } = require('../../data/models')

module.exports = function (adminId, eventId) {

    validateId(adminId, 'Administrator ID')
    validateId(eventId, 'event ID')


    return Administrator.findById(adminId).then((admin) => {

        if (!admin) throw new ExistenceError('Administrator not found!')

        return Event.findById(eventId).then((event) => {
            if (!event) throw new ExistenceError('event not found')

            return event.deleteOne({ _id: eventId })

        })
    })

}