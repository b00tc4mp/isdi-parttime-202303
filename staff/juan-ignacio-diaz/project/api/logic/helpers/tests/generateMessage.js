module.exports = (userId, view) => {
    return {
            text: `text-${Math.random()}`,
            author: userId,
            view
        }
}