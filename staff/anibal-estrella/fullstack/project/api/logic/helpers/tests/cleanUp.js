const context = require('../../context')

module.exports = () => {
    const {
        users,
        events,
        eventReviews,
        places
    } = context

    // in series
    // return users.deleteMany()
    //     .then(() => posts.deleteMany())

    // in parallel (faster)
    return Promise.all([
        console.log('>>> cleanup!!!'),
        users.deleteMany(),
        events.deleteMany(),
        eventReviews.deleteMany(),
        places.deleteMany()
    ])
}