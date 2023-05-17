import { validateId } from './helpers/validators'
import { savePost, findPostById, findUserById } from "../data"

export default (userId, postId) => {    
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = findUserById(userId)

    if(!user) throw new Error (`User id ${userId} not found`)

    const post = findPostById(postId)

    if(!post) throw new Error (`Post id ${postId} not found`)

    if(!post.likedBy){
        post.likedBy = [userId]
    } else {
        const index = post.likedBy.indexOf(userId)

        if(index < 0)
            post.likedBy.push(userId)
        else{
            post.likedBy.splice(index, 1)

            if(!post.likedBy.length) delete post.likedBy
        }
    }

    savePost(post)
}