const sendAchievementNotification = require('./sendAchievementNotification');

module.exports = (achievement, updateLogic) => {
    achievement.progress += updateLogic();
    if (achievement.ranks.length === 1) {
        if (achievement.progress === 1) {
            achievement.isRankBronzeReached = true;
            achievement.isRankSilverReached = true;
            achievement.isRankGoldReached = true;
            sendAchievementNotification(achievement, 'gold');
        }
    } else {
        if (!achievement.isRankBronzeReached && achievement.progress >= achievement.ranks[0]) {
            achievement.isRankBronzeReached = true;
            sendAchievementNotification(achievement, 'bronze');
        }
        if (achievement.isRankBronzeReached && achievement.progress >= achievement.ranks[1]) {
            achievement.isRankSilverReached = true;
            sendAchievementNotification(achievement, 'silver');
        }
        if (achievement.isRankSilverReached && achievement.progress >= achievement.ranks[2]) {
            achievement.isRankGoldReached = true;
            sendAchievementNotification(achievement, 'gold');
        }
    }

    return achievement
}