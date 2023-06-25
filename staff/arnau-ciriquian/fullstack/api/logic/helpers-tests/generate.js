module.exports = {
    user: () => ({
        id: `user-${Math.random()}`,
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@test.com`,
        password: `Password-${Math.random()}`
    }),

    post: userId => ({
        id: `post-${Math.random()}`,
        author: userId,
        image: `image-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date,
        likes: []
    })
}