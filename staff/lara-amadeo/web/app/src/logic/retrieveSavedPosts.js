import { findUserbyId, loadPosts } from "../data";

export default function retrieveSavedPosts(userId, callback){

    findUserbyId(userId, user => {
        if(!user){
            callback(new Error('User not found'))
        }

        loadPosts(posts => {
            const _posts = posts.filter(post => user.savedPosts.includes(post.id))

            callback(null, _posts)
        })
    })
}