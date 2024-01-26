/**
 * Updates achievements ranks by it's progress
 * 
 * @param {object} achievement The achievement to update
 * 
 * @returns {object} Achivements completely updated and boolean that saids if it should send a notification
 */

module.exports = (achievement) => {
    let hasToBePushed = false;
    if (achievement.ranks.length === 1) {
        if (achievement.progress === 1) {
            achievement.isRankBronzeReached = true;
            achievement.isRankSilverReached = true;
            achievement.isRankGoldReached = true;
            hasToBePushed = true;
        }
    } else {
        if (!achievement.isRankBronzeReached && achievement.progress >= achievement.ranks[0]) {
            achievement.isRankBronzeReached = true;
            hasToBePushed = true;
        }
        if (!achievement.isRankSilverReached && achievement.progress >= achievement.ranks[1]) {
            achievement.isRankSilverReached = true;
            hasToBePushed = true;
        }
        if (!achievement.isRankGoldReached && achievement.progress >= achievement.ranks[2]) {
            achievement.isRankGoldReached = true;
            hasToBePushed = true;
        }
    }

    return { achievement, hasToBePushed }
}