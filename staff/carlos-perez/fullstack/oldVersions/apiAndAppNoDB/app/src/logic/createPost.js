import { loadPosts, savePosts, findUserById } from '../data'

export function createPost(userId, image, text, callback) {

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        let id = 'post-1'

        loadPosts(posts => {
            const lastPost = posts[posts.length - 1]

            if (lastPost)
                id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

            const post = {
                id,
                author: userId,
                image,
                text,
                date: new Date,
                likes: []
            }

            posts.push(post)

            savePosts(posts, () => callback(null))
        })
    })
}