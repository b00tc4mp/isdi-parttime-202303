module.exports = (user, users, posts) => {
    posts.forEach(post => {
        post.fav = user.favs.includes(post.id)
        post.date = new Date(post.date);
        post.dateLastModified = new Date(post.dateLastModified);

        const author = users.find(tmpUser => tmpUser.id === post.author)

        if (author)
            post.author = {
                id: author.id,
                name: author.name,
                avatar: author.avatar
            }
    })

    return posts
}