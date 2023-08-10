const {
    validators: { validateId, validateGameData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const userAchievements = await Achievements.findOne({
            user: userId,
        });
        if (!userAchievements) throw new ExistenceError('user not found');
        const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
            if (achievement.category === 'tutorial' && !achievement.completed) {
                achievement.progress += 1;
                achievement.isRankReached = true;
                achievement.completed = true;
            }
            return achievement
        });
        await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });;
    })();
};