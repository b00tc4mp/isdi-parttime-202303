const { retrieveAllUserSessions, cleanSession } = require('../../logic');

/**
 * Emits the notification to all the socket sessions of the userId
 * 
 * @param {object} achievement The achievement to update
 * @param {string} userId The achievement to update
 * 
 */
module.exports = async (achievement, userId) => {
    const rank = achievement.isRankGoldReached ? 'gold' : achievement.isRankSilverReached ? 'silver' : 'bronze';
    const io = require('../../index.js').io;
    const sockets = await retrieveAllUserSessions(userId);
    const notification = { message: `NEW TROPHIE: "${achievement.name}" - ${rank} rank`, sockets: sockets }

    io.emit('notification', notification);
}
