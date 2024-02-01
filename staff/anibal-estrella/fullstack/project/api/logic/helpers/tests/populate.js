const context = require('../../context')

module.exports = (_users, _events, _places, _eventReviews) => {
    const { users, events, places, eventReviews } = context

    const promises = []

    promises.push(users.insertMany(_users))

    if (_events.length)
        promises.push(events.insertMany(_events))

    if (_eventReviews.length)
        promises.push(eventReviews.insertMany(_eventReviews))

    if (_places.length)
        promises.push(places.insertMany(_places))

    return Promise.all(promises)
}