const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User, Level, Achievements } = require('../../data/models');
const updateAchievementsProgress = require('../helpers/updateAchievementsProgress');

module.exports = async (userId) => {
    validateId(userId, 'userId');

    const [userAchievements, user, likes] = await Promise.all([
        Achievements.findOne({ user: userId }),
        User.findOne({ _id: userId }),
        Level.find({ likes: userId }).then(likedLevels => {
            return likedLevels.length;
        })

    ]);

    if (!userAchievements || !user) {
        throw new ExistenceError('user not found');
    }

    const achievementCodeToUpdateValue = {
        S01: user.followers.length,
        S02: user.follows.length,
        S03: likes,
        S04: user.saves.length,
    };

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'social' && !achievement.isRankGoldReached) {
            const updateValue = achievementCodeToUpdateValue[achievement.code];
            if (updateValue && achievement.progress < updateValue) {
                achievement.progress = updateValue;
                return updateAchievementsProgress(achievement);
            }
            return achievement;
        }
        return achievement;
    });

    await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });
};
