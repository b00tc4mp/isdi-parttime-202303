const { ObjectId } = require('mongodb')

module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
        nickName: `nickName-${Math.random()}`,
        ipGeoLocation: `ipGeoLocation-${Math.random()}`,
        password: `password-${Math.random()}`,
    }),

    event: userId => ({
        author: userId,
        image: `image-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date,
    })
}