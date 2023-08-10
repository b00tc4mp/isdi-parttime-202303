const {
    validators: { validateId, validateText },
    errors: { ExistenceError }
} = require('com')
const { Administrator, Event } = require('../../data/models')

module.exports = function modifyEvent(adminId, eventId, title, eventDate, location, text, links, visibility) {
    validateId(adminId, 'admin id')
    validateText(title, 'title')
    validateText(text, 'text')
    validateText(location, 'location')
    validateId(eventId, 'event id')
    //validate visibility

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)
            return Event.findById(eventId)
                .then(event => {
                    if (!event) throw new ExistenceError(`This event does not exist`)
                    event.title = title;
                    event.eventDate = Date.parse(eventDate);
                    event.location = location;
                    event.text = text;
                    event.links=links;
                    event.visibility = visibility;
                    return event.save()
                })
        })
        .then(() => { })
}