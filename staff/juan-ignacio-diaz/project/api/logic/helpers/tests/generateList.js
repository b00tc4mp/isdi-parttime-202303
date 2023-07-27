module.exports = (userId) => {
    return {
            name: `name-${Math.random()}`,
            author: userId,
            users: [], 
            dateToEnd: new Date(Date.now()),
            notifyAcceptList: [],
            notifyChatUpdate: []
        }
}