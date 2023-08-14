const {
    validators: { validateId, validateCreateData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');
const updateAchievementsProgress = require('../helpers/updateAchievementsProgress');

module.exports = async (userId, createData) => {
    validateId(userId, 'userId');
    validateCreateData(createData);

    const { bombs, life, cc, floors } = createData;

    const userAchievements = await Achievements.findOne({ user: userId });
    if (!userAchievements) throw new ExistenceError('user not found');

    const achievementCodeToUpdateLogic = {
        'C01': () => 1,
        'C02': () => bombs,
        'C03': () => life,
        'C04': () => cc,
        'C05': () => floors >= 99 ? 1 : 0
    };

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'create' && !achievement.isRankGoldReached) {
            const updateLogic = achievementCodeToUpdateLogic[achievement.code];
            if (updateLogic) {
                if (updateLogic) {
                    return updateAchievementsProgress(achievement, updateLogic);
                }
            }
            return achievement;
        }
        return achievement;
    });

    await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });
};
