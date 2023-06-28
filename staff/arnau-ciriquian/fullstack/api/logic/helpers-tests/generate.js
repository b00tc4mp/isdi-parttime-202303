const { ObjectId }= require('mongodb')

module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@test.com`,
        password: `Password-${Math.random()}`
    }),

    post: userId => ({
        author: userId,
        image: `image-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date,
        likes: []
    })
}