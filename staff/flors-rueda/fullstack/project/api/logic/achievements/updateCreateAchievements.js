const {
    validators: { validateId, validateCreateData },
    errors: { ExistenceError }
} = require('com');
const { Achievements } = require('../../data/models');

module.exports = (userId, createData) => {
    validateId(userId, 'userId');
    validateCreateData(createData);

    const { bombs, life, cc, floors } = createData;

    return (async () => {
        const userAchievements = await Achievements.findOne({
            user: userId,
        });
        if (!userAchievements) throw new ExistenceError('user not found');
        const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
            if (achievement.category === 'create' && !achievement.completed) {
                switch (achievement.code) {
                    case ('C01'):
                        achievement.progress += 1;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('C02'):
                        achievement.progress += bombs;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('C03'):
                        achievement.progress += life;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('C04'):
                        achievement.progress = achievement.progress + cc;
                        if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                        if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                        break;
                    case ('C05'):
                        if (floors >= 99) {
                            achievement.progress += 1;
                            achievement.isRankReached = true;
                            achievement.completed = true;
                        }
                        break;
                }
            }
            return achievement
        });
        await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });;
    })();
};