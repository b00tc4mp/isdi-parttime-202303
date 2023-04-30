import { renderPosts } from "../pages/home-page"
import { savePost } from "../data"
import { findPostById, findUserById } from "./helpers/data-managers"

export default (userId, postId) => {    
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = findUserById(userId)

    if(!user) throw new Error (`User id ${userId} not found`)

    const post = findPostById(postId)

    if(!post) throw new Error (`Post id ${postId} not found`)
    
    if(!foundPost.likedBy.includes(user.id)){
        foundPost.likedBy.push(user.id)
        savePost(foundPost)
        return renderPosts()
    } else {
        const index = foundPost.likedBy.indexOf(user.id)
        foundPost.likedBy.splice(index, 1)
        savePost(foundPost)
        return renderPosts()
    }
}