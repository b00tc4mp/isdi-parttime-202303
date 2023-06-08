module.exports = function RandomUser () {
    const countId = Math.round(Math.random() * 100 + 1)
    
    return {countId,
        id: `user-${countId}`,
        name: `name-${Math.random()}`,
        email: `e-${Math.random()}@email.com`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}.gif`,
        favs: [`post-${Math.random()}`]}
}