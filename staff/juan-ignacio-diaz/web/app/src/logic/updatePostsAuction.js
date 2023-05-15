import { postsAuction } from "../data";
import { findPostById } from "./helpers/dataManagers";

export default function updatePostsAuction() {
    const tmpPostsAucion = postsAuction()

    tmpPostsAucion.forEach(postAuction => { 
        if (postAuction.date < Date.now) {
            const {userId, postId} = postAuction
            const tmpPost = findPostById(postId)

            if (tmpPost) {
                tmpPost.author = userId

                deletePostAuction(userId, postId)
            }
        }
    }); 


}