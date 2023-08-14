const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');
const updateAchievementsProgress = require('../helpers/updateAchievementsProgress');

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const userAchievements = await Achievements.findOne({
            user: userId,
        });
        if (!userAchievements) throw new ExistenceError('user not found');

        const achievementCodeToUpdateLogic = {
            'T01': () => 1,
        }

        const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
            if (achievement.category === 'tutorial' && !achievement.isRankGoldReached) {
                const updateLogic = achievementCodeToUpdateLogic[achievement.code];
                if (updateLogic) {
                    if (updateLogic) {
                        return updateAchievementsProgress(achievement, updateLogic);
                    }
                }
                return achievement;
            }
            return achievement
        });
        await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });;
    })();
};