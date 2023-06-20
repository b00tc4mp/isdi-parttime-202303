module.exports = function generateUser (users) {
    let countId = Math.round(Math.random() * 100 + 1)

    if(users)
        while (users.some(tmpUser => tmpUser.id === `user-${countId}`))
            countId = Math.round(Math.random() * 100 + 1)

    return {countId,
        user: {
            id: `user-${countId}`,
            name: `name-${Math.random()}`,
            email: `e-${Math.random()}@email.com`,
            password: `password-${Math.random()}`,
            avatar: `avatar-${Math.random()}.gif`,
            favs: [],
            mode: `mode-${Math.random()}`
        }
    }
}