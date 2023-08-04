module.exports = {
    level: (name, layout, hp, author, likes, date) => ({
        name: name,
        layout: layout,
        hp: hp,
        author: author,
        likes: likes,
        date: date,
    }),
    user: (username, password, avatar, color, recoveryQuestions, saves) => ({
        username: username,
        password: password,
        avatar: avatar,
        color: color,
        saves: saves,
        recoveryQuestions: recoveryQuestions,
        joined: Date.now()
    })
};