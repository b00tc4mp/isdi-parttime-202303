const {
    validators: { validateId },
    errors: { ExistenceError, UnknownError }
} = require('com');
const { User, Level, Achievements } = require('../../data/models');

module.exports = async (userId) => {
    validateId(userId, 'userId');

    const userAchievements = await Achievements.findOne({
        user: userId,
    });

    const user = await User.findOne({
        _id: userId,
    });

    if (!userAchievements || !user) {
        throw new ExistenceError('user not found');
    }

    let achievementLevels;
    try {
        achievementLevels = await Level.find({
            author: userId,
            'likes.length': { $gte: 15 }
        }).exec();
    } catch (error) {
        throw new UnknownError(error.message);
    }

    const date1 = new Date(user.joined);
    const date2 = new Date(Date.now());
    const timeDifference = date2 - date1;
    const millisecondsInAMonth = 30 * 24 * 60 * 60 * 1000;

    const updateAchievements = userAchievements.progressByAchievement.map(achievement => {
        if (achievement.category === 'social' && !achievement.completed) {
            switch (achievement.code) {
                case ('S01'):
                    achievement.progress += user.followers.length;
                    if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                    if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                    break;
                case ('S02'):
                    achievement.progress += user.follows.length;
                    if (achievement.progress >= achievement.ranks[0] && !achievement.isRankReached) achievement.isRankReached = true;
                    if (achievement.progress >= achievement.ranks[2]) achievement.completed = true;
                    break;
                case ('S03'):
                    if (achievementLevels) {
                        achievement.progress += 1;
                        achievement.isRankReached = true;
                        achievement.completed = true;
                    }
                    break;
                case ('S04'):
                    if (user.saves.length > 0) {
                        achievement.progress += 1;
                        achievement.isRankReached = true;
                        achievement.completed = true;
                    }
                    break;
                case ('S05'):
                    if (timeDifference > millisecondsInAMonth) {
                        achievement.progress += 1;
                        achievement.isRankReached = true;
                        achievement.completed = true;
                    }
                    break;
            }
        }
        return achievement
    });


    await Achievements.updateOne({ user: userId }, { progressByAchievement: updateAchievements });
};


/*



*/