const {
    validators: { validateId, validateGameData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');

module.exports = (userId, gameData) => {
    validateId(userId, 'userId');
    validateGameData(gameData);

    const { stonks, holes, bombs, life, cc } = gameData;

    return (async () => {
        const userAchievements = await Achievements.findOne({
            user: userId,
        });
        if (!userAchievements) throw new ExistenceError('user not found');
        const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
            if (achievement.category === 'game' && !achievement.completed) {
                switch (achievement.code) {
                    case ('G01'):
                        achievement.progress += 1;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('G02'):
                        achievement.progress += holes;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('G03'):
                        achievement.progress += stonks;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('G04'):
                        achievement.progress = achievement.progress + bombs;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('G05'):
                        if (life === 7) achievement.progress += 1;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('G06'):
                        achievement.progress += cc;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                }
            }
            return achievement
        });
        await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });;
    })();
};