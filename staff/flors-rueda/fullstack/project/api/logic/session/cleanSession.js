const { Session } = require('../../data/models');
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');

/**
 * Deletes a session based on the given socket Id and cleans any too old session remaining
 * 
 * @param {string} userId The user id
 * @param {string} socketId The session socket id to be deleted
 * 
 */
module.exports = (userId, socketId) => {
    validateId(userId, 'userId');

    return (async () => {
        const userSessions = await Session.findOne({
            user: userId,
        });

        if (!userSessions) throw new ExistenceError('user not found');

        const olderThanToken = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);

        await Session.updateMany(
            { 'sessions.date': { $lt: olderThanToken } },
            { $pull: { sessions: { date: { $lt: olderThanToken } } } }
        );
    })();
}
