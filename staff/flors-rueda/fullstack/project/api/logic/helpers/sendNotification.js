module.exports = (achievement, userId) => {
    const io = require('../../index.js').io;
    const frontendSocketId = require('../../index.js').frontendSocketId;
    io.in(frontendSocketId).emit('notification', `Congratulations! You've reached a new rank on "${achievement.name}"`);
}

