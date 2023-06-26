const { ObjectId } = require('mongodb')

module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
    }),

    post: userId => ({
        author: userId,
        image: `image-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date,
    })
}