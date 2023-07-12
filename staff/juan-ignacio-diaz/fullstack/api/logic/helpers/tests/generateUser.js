module.exports = () => {
    return {
        name: `name-${Math.random()}`,
        email: `e-${Math.random()}@email.com`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}.gif`,
        favs: [],
        mode: `mode-${Math.random()}`
    }
}