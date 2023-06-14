module.exports = function RandomPost (userId) {
    const countId = Math.round(Math.random() * 100 + 1)
    
    return {
        countId,
        post:{
            id: `post-${countId}`,
            author: userId,
            image: `image-${Math.random()}`,
            text: `text-${Math.random()}`,
            date: new Date,
            dateLastModified: new Date,
            likes: [`likes-${Math.random()}`],
            lock: false,
            price: 0
        }
    }
}