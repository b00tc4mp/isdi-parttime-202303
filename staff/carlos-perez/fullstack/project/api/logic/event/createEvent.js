const { validators: { validateId, validateText }, errors: { ExistenceError } } = require('com')
const { Administrator, Event } = require('../../data/models')

module.exports = (adminId, title, eventDate, location, text, links, visibility) => {
    validateId(adminId, 'admin id')
    validateText(title, 'title')
    validateText(text, 'text')

    return Administrator.findById(adminId)
        .then(admin => {
            if (!admin) throw new ExistenceError(`Admin does not exist`)

            const dateToDate = Date.parse(eventDate)
            Event.create({author: adminId, title: title, eventDate: dateToDate, location: location, text: text,links: links, visibility: visibility })
        })
        .then(() => { })
}