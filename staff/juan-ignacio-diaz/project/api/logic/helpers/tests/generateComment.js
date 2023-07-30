module.exports = (userId) => {
    return {
            text: `text-${Math.random()}`,
            author: userId
        }
}