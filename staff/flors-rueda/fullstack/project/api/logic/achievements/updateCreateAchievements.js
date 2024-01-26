const {
    validators: { validateId, validateCreateData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');
const updateAchievementsProgress = require('../helpers/updateAchievementsProgress');

/**
 * Updates create achievements by user id
 * 
 * @param {string} userId The user id
 * @param {object} createData Includes { bombs, life, floors } of the created level
 * 
 * @returns {[object]} Achivements that have reach a new rank
 */

module.exports = async (userId, createData) => {
    validateId(userId, 'userId');
    validateCreateData(createData);

    const { bombs, life, floors } = createData;

    const userAchievements = await Achievements.findOne({ user: userId });
    if (!userAchievements) throw new ExistenceError('user not found');

    const achievementCodeToUpdateValue = {
        C01: 1,
        C02: bombs,
        C03: life,
        C04: floors >= 99 ? 1 : 0
    };

    const achievementsToNotify = [];

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'create' && !achievement.isRankGoldReached) {
            const updateValue = achievementCodeToUpdateValue[achievement.code];
            if (updateValue) {
                achievement.progress += updateValue;
                const update = updateAchievementsProgress(achievement, achievementsToNotify);
                if (update.hasToBePushed) achievementsToNotify.push(update.achievement);
                return update.achievement;
            }
            return achievement;
        }
        return achievement;
    });

    await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });

    return achievementsToNotify;
};
