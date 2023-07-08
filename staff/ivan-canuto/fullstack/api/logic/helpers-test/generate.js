module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email@${Math.random()}.com`,
        password: `password-${Math.random()}`,
        avatar: null,
        favs: []
    }),

    post: userId => ({
        author: userId,
        image: `image-${Math.random()}.jpg`,
        text: `text-${Math.random()}`,
        date: new Date().toLocaleDateString(),
    })
}