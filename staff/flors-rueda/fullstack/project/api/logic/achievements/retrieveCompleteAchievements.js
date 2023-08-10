const {
    validators: { validateId },
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
        const completeAchievements = userAchievements.progressByAchievement.filter(achievement => achievement.isRankReached === true)
            .map(achievement => {
                let rank;
                if (achievement.completed) {
                    rank = 'gold'
                } else {
                    rank = achievement.progress < achievement.ranks[1] ? 'bronze' : 'silver'
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