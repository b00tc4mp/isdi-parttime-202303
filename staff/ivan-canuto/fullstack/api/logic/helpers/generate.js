const sinon = require('sinon')

const clock = sinon.useFakeTimers({
    now: new Date('2023-06-18').getTime(),
    shouldAdvanceTime: false
})

module.exports = {
    user: () => ({
        id: `user-${Math.random()}`,
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}`,
        password: `password-${Math.random()}`,
        favs: []
    }),

    post: userId => ({
        id: `post-1`,
        author: userId,
        image: `image-${Math.random()}.jpg`,
        text: `text-${Math.random()}`,
        date: new Date,
        likes: [],
        visible: true,
        onSale: null,
        comments: []
    })
}