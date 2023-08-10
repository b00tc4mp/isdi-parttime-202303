const {
    validators: { validateId, validateGameData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');

module.exports = async (userId, gameData) => {
    validateId(userId, 'userId');
    validateGameData(gameData);

    const { stonks, holes, bombs, life, cc } = gameData;

    const userAchievements = await Achievements.findOne({ user: userId });
    if (!userAchievements) throw new ExistenceError('user not found');

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'game' && !achievement.completed) {
            const updateValue = {
                'G01': 1,
                'G02': holes,
                'G03': stonks,
                'G04': bombs,
                'G05': life === 7 ? 1 : 0,
                'G06': cc
            }[achievement.code] || 0;

            achievement.progress += updateValue;

            if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) {
                achievement.isRankReached = true;
            }
            if (achievement.progress >= achievement.ranks[2]) {
                achievement.completed = true;
            }
        }
        return achievement;
    });

    await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });
};
