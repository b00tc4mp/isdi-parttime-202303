module.exports = (userId) => {
    return {
            name: `name-${Math.random()}`,
            owner: userId,
            guests: [], 
            dateToEnd: new Date(Date.now()),
            invited: [],
            notifyChatUpdate: []
        }
}