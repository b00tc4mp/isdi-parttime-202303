const {
    validators: { validateId },
    errors: { ExistenceError, UnknownError }
} = require('com');
const { User, Level, Achievements } = require('../../data/models');

module.exports = async (userId) => {
    validateId(userId, 'userId');

    const [userAchievements, user, achievementLevels] = await Promise.all([
        Achievements.findOne({ user: userId }),
        User.findOne({ _id: userId }),
        Level.find({ author: userId, 'likes.length': { $gte: 15 } }).exec().catch(error => {
            throw new UnknownError(error.message);
        })
    ]);

    if (!userAchievements || !user) {
        throw new ExistenceError('user not found');
    }

    const achievementCodeToUpdateLogic = {
        'S01': () => user.followers.length,
        'S02': () => user.follows.length,
        'S03': () => achievementLevels ? 1 : 0,
        'S04': () => user.saves.length > 0 ? 1 : 0,
    };

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'social' && !achievement.completed) {
            const updateLogic = achievementCodeToUpdateLogic[achievement.code];
            if (updateLogic) {
                achievement.progress += updateLogic();
                if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                if (achievement.progress >= achievement.ranks[achievement.ranks.length - 1]) achievement.completed = true;
            }
        }
        return achievement;
    });

    await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });
};
