import { savePostsInStorage, saveUsersInStorage } from "../data"

export default function likeAndUnlike (post, user) {

    const postAlreadyLikedByUser = user.likedPosts.includes(post.id)

    if(!postAlreadyLikedByUser){

        const likesInPost = "likes" in post
        if (likesInPost){
            post.likes.push(user.id)
        } else {
            post.likes = []
            post.likes.push(user.id)
        }

        const likedPostsInUser = "likedPosts" in user
        if(likedPostsInUser){
            user.likedPosts.push(post.id)
        } else {
            user.likedPosts = []
            user.likedPosts.push(post.id)
        }
        savePostsInStorage()
        saveUsersInStorage()
    } else{
        const indexPostInUser = user.likedPosts.findIndex(elem => elem === post.id)
        user.likedPosts.splice(indexPostInUser, 1)

        const indexUserInPost = post.likes.findIndex(elem => elem.id === user.id) 
        post.likes.splice(indexUserInPost, 1)

        savePostsInStorage()
        saveUsersInStorage()
    }

}








// if(user.likedPosts.length >= 1)
// const postAlreadyLikedByUser = user.likedPosts.includes(postId)

// if(!postAlreadyLikedByUser){
//     likeIcon.classList.add('like-icon-filled')
//     user.likedPosts.push(postId)
//     saveUsersInStorage()

//     if(likedPosts.length >= 1){
//         likedPosts[likedPosts.length] = {
//             userId: user.id,
//             postId: postId
//         }
//         saveLikedPostsInStorage()
//     } else {
//         likedPosts[0] = {
//                     userId: user.id,
//                     postId: postId
//                     }
//         saveLikedPostsInStorage()
//     }
// } else{
//     likeIcon.classList.remove('like-icon-filled')

//     const indexPostinUser = user.likedPosts.findIndex(elem => elem === postId)
//     user.likedPosts.splice(indexPostinUser, 1)
//     saveUsersInStorage()

//     const indexPostinLikedPosts = likedPosts.findIndex(elem => elem.id === likedPosts.postId) 
//     likedPosts.splice(indexPostinLikedPosts, 1)
//     saveLikedPostsInStorage()
// }


// if (localStorage.likedPosts.length >= 1) {
//     const postAlreadyLiked = user.likedPosts.includes(postId)

//     if (!postAlreadyLiked) {
        
//         likedPosts[likedPosts.length] = {
//             userId: user.id,
//             postId: postId
//         }
//         saveLikedPostsInStorage()
//     }
// } else {
//     likedPosts[0] = {
//         userId: user.id,
//         postId: postId
//     }
//     user.likedPosts = []
//     user.likedPosts.push(postId)
//     saveLikedPostsInStorage()
//     saveUsersInStorage()
// }