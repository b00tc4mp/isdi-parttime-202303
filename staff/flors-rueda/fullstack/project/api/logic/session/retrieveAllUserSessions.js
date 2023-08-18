const { Session } = require('../../data/models');
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');

/**
 * Retrieve's all user id sessions socket id's
 * 
 * @param {string} userId The user id
 * 
 * @returns {[string]} All session socketId
 */
module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const user = await Session.findOne({
            user: userId,
        });

        if (!user) throw new ExistenceError('user not found');

        const socketIds = user.sessions.map(session => session.socketId);

        return socketIds;
    })();
}
