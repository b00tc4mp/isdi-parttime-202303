module.exports = (achievement) => {
    const io = require('../../index.js').io;
    io.emit('notification', `Congratulations! You've reached a new rank on "${achievement.name}"`);
}

