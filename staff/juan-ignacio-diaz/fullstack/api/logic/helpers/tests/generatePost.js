module.exports = (userId) => {
    return {
            author: userId,
            image: `image-${Math.random()}`,
            text: `text-${Math.random()}`,
            date: new Date,
            dateLastModified: new Date,
            likes: [],
            lock: false,
            price: 0
        }
}