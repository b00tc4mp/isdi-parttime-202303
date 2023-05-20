import { savePost, posts } from "../data.js";
import { findUserById, findPostById } from "./helpers/dataManagers.js"; 
import { validateId, validatePostId } from "./helpers/validators.js";

export default function deletePost(userId, postId) {
    validateId(userId)
    validatePostId(postId)

    const user = findUserById(userId)
    if (!user) throw new Error('user not found') 

    const post = findPostById(postId)
    if (!post) throw new Error('postId not found') 

    if(post.author !== userId) throw new Error('only author can delete this post')

    const _posts = posts()

    const index = _posts.findIndex(post => post.id)
    
    _posts.splice(index, 1)

    savePost(_posts)
}