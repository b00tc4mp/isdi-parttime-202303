import { savePost } from "../data.js";
import { findUserById, findPostById } from "./helpers/data-managers.js"; 
import { validateId, validatePostId } from "./helpers/validators.js";

export default function toggleLikePost(userId, postId) {
    validateId(userId)
    validatePostId(postId)

    const user = findUserById(userId)
    if (!user) throw new Error('user not found') 

    const post= findPostById(postId)
    if (!post) throw new Error('post not found') 

    if(!post.likes) {
        post.likes = [userId]
    }else {
        // TODO:
        //- extract index userId in post.likes
        //- if index < 0 then and userId to post.likes
        //- if index >= 0 remove userId from post.likes (splice)

        const index = post.likes.indexOf(userId)

        if(index < 0){
            post.likes.push(userId)
        }else{
            post.likes.splice(index, 1)

            if (!post.likes.length) delete post.likes
        }
    }
    savePost(post)
}