module.exports = {
    user: () => ({
        id: `user-${Math.random()}`,
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}`
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