module.exports = (achievement) => {
    const rank = achievement.isRankGoldReached ? 'gold' : achievement.isRankSilverReached ? 'silver' : 'bronze';
    const io = require('../../index.js').io;
    const frontendSocketId = require('../../index.js').frontendSocketId;
    if (frontendSocketId) io.in(frontendSocketId).emit('notification', `NEW TROPHIE: "${achievement.name}" - ${rank} rank`);
}
