const {
    validators: { validateId, validateCreateData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');

module.exports = async (userId, createData) => {
    validateId(userId, 'userId');
    validateCreateData(createData);

    const { bombs, life, cc, floors } = createData;

    const userAchievements = await Achievements.findOne({ user: userId });
    if (!userAchievements) throw new ExistenceError('user not found');

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'create' && !achievement.completed) {
            const updateValue = {
                'C01': 1,
                'C02': bombs,
                'C03': life,
                'C04': cc,
                'C05': floors >= 99 ? 1 : 0
            }[achievement.code] || 0;

            achievement.progress += updateValue;

            if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) {
                achievement.isRankReached = true;
            }
            if (achievement.progress >= achievement.ranks[achievement.ranks.lengths - 1]) {
                achievement.completed = true;
            }
        }
        return achievement;
    });

    await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });
};
