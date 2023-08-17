const {
    validators: { validateId, validateCC, validateOperator },
    errors: { ExistenceError }
} = require('com');
const { Achievements, User } = require('../../data/models');
const updateAchievementsProgress = require('../helpers/updateAchievementsProgress');

/**
 * Updates cc achievements by user id
 * 
 * @param {string} userId The user id
 * @param {string} cc The number of cc to update
 * @param {string} operator Use + for earning operations and - for spending operations
 * 
 * @returns {[object]} Achivements that have reach a new rank
 */

module.exports = async (userId, cc, operator) => {
    validateId(userId, 'userId');
    validateCC(cc);
    validateOperator(operator);

    const [userAchievements, user] = await Promise.all([
        Achievements.findOne({ user: userId }),
        User.findOne({ _id: userId }),
    ]);

    if (!userAchievements || !user) {
        throw new ExistenceError('user not found');
    }

    const achievementCodeToUpdateValue = {
        CC01: operator === '+' ? cc : 0,
        CC02: operator === '-' ? cc : 0,
        CC03: operator === '-' && user.cc - cc <= 0 ? 1 : 0,
    }

    const achievementsToNotify = [];

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'cc' && !achievement.isRankGoldReached) {
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
