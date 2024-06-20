module.exports = function generatePost (userId, posts) {
    let countId = Math.round(Math.random() * 100 + 1)
    
    if(posts)
        while (posts.some(tmpPost => tmpPost.id === `post-${countId}`))
            countId = Math.round(Math.random() * 100 + 1)

    return {
        countId,
        post:{
            id: `post-${countId}`,
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
}