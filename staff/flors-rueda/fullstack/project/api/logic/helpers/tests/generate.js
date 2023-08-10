module.exports = {
    level: (name, layout, hp, author, likes, date) => ({
        name: name,
        layout: layout,
        hp: hp,
        author: author,
        likes: likes,
        date: date,
    }),
    user: (username, password, avatar, color, recoveryQuestions, saves, follows, followers, cc) => ({
        username: username,
        password: password,
        avatar: avatar,
        color: color,
        saves: saves,
        follows: follows,
        followers: followers,
        cc: cc,
        recoveryQuestions: recoveryQuestions,
        joined: Date.now()
    }),
    achievements: (userId, allAchievements) => ({
        user: userId,
        progressByAchievement: allAchievements,
    })
};