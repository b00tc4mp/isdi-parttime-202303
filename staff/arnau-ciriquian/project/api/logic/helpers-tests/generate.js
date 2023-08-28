module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@test.com`,
        password: `Password-${Math.random()}`
    }),

    character: () => ({
        characterName: `name-${Math.random()}`,
        avatar: `image-${Math.random()}`,
        level: 1
    }),

    mission: () => ({
        image: `image-${Math.random()}`,
        tittle: `tittle-${Math.random()}`,
        info: `info-${Math.random()}`,
        level: `${Math.random()}`,
        difficulty: `difficulty-${Math.random()}`,
        visibility: true,
        survivors: []
    })
}