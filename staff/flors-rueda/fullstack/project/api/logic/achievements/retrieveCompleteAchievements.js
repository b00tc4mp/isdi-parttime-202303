const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');

/**
 * Retrieves completed achievements by user id
 * 
 * @param {string} userId The user id
 * 
 * @returns {[object]} Complete achievements of the user id
 */

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const userAchievements = await Achievements.findOne({
            user: userId,
        });
        if (!userAchievements) throw new ExistenceError('user not found');
        const completeAchievements = userAchievements.progressByAchievement.filter(achievement => achievement.isRankBronzeReached === true)
            .map(achievement => {
                let rank;
                if (achievement.isRankGoldReached) {
                    rank = 'gold'
                } else {
                    rank = achievement.isRankSilverReached ? 'silver' : 'bronze'
                }
                return {
                    code: achievement.code,
                    name: achievement.name,
                    rank: rank
                };
            });
        return completeAchievements;
    })();
};