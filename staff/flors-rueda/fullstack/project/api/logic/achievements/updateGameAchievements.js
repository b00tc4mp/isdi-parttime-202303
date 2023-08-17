const {
    validators: { validateId, validateGameData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');
const updateAchievementsProgress = require('../helpers/updateAchievementsProgress');

/**
 * Updates game achievements by user id
 * 
 * @param {string} userId The user id
 * @param {object} gameData Includes { stonks, holes, bombs, life } of the played last game
 * 
 * @returns {[object]} Achivements that have reach a new rank
 */

module.exports = async (userId, gameData) => {
    validateId(userId, 'userId');
    validateGameData(gameData);

    const { stonks, holes, bombs, life } = gameData;

    const userAchievements = await Achievements.findOne({ user: userId });
    if (!userAchievements) throw new ExistenceError('user not found');

    const achievementCodeToUpdateValue = {
        G01: 1,
        G02: holes,
        G03: stonks,
        G04: bombs,
        G05: life >= 7 ? 1 : 0,
    }

    const achievementsToNotify = [];

    const achievementsToUpdate = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'game' && !achievement.isRankGoldReached) {
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

    await Achievements.updateOne({ user: userId }, { progressByAchievement: achievementsToUpdate });

    return achievementsToNotify;
};