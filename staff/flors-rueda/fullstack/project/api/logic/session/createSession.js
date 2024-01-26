const { Session } = require('../../data/models');
const { errors: { UnknownError } } = require('com');
const {
    validators: { validateId },
} = require('com');

/**
 * Creates a new session if it doesn't exists and adds the new one if it does exist
 * 
 * @param {string} userId The user id
 * @param {string} socketId The session socket id
 * 
 */

module.exports = (userId, socketId) => {
    validateId(userId, 'userId');
    validateId(socketId, 'socketId');

    return (async () => {
        const userSessions = await Session.findOne({
            user: userId,
        });
        if (!userSessions) {
            return Session.create({
                user: userId,
                sessions: [{ socketId: socketId, date: Date.now() }]
            }).catch(error => {
                throw UnknownError(error.message)
            })
        } else {
            const updateSessions = userSessions.sessions;
            const newSession = { socketId: socketId, date: Date.now() };
            updateSessions.push(newSession);
            await Session.updateOne({ user: userId }, { sessions: updateSessions });
        }
    })();
}