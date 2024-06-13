module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email@${Math.random()}.com`,
        password: `password-${Math.random()}`,
        avatar: null,
        favs: []
    }),
}