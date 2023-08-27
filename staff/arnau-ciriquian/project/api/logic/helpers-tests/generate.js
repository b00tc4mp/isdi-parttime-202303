module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@test.com`,
        password: `Password-${Math.random()}`
    }),

    character: () => ({
        name: `name-${Math.random()}`,
        avatar: `image-${Math.random()}`,
    })
}