module.exports = {
    level: (name, layout) => ({
        name: name,
        layout: layout
    }),
    user: (username, password, avatar, color, recoveryQuestions) => ({
        username: username,
        password: password,
        avatar: avatar,
        color: color,
        recoveryQuestions: recoveryQuestions,
        joined: Date.now()
    })

}