import { savePostInStorage, saveUserInStorage, posts, users } from "../data.js"

export default function likeAndUnlike (post, userId) {

    const _posts = posts()
    const _post = _posts.find(_post => _post.id === post.id)
    
    const _users = users()
    const _user = _users.find(_user => _user.id === userId)

        const postAlreadyLikedByUser = _user.likedPosts.includes(_post.id)

        if(!postAlreadyLikedByUser){

            const likesInPost = "likes" in _post
            if (likesInPost){
                _post.likes.push(userId)
            } else {
                _post.likes = []
                _post.likes.push(userId)
            }

            const likedPostsInUser = "likedPosts" in _user
            if(likedPostsInUser){
                _user.likedPosts.push(post.id)
            } else {
                _user.likedPosts = []
                _user.likedPosts.push(post.id)
            }
            savePostInStorage(_post)
            saveUserInStorage(_user)
        } else{
            const indexPostInUser = _user.likedPosts.findIndex(elem => elem === post.id)
            _user.likedPosts.splice(indexPostInUser, 1)

            const indexUserInPost = _post.likes.findIndex(elem => elem.id === userId) 
            _post.likes.splice(indexUserInPost, 1)

            savePostInStorage(_post)
            saveUserInStorage(_user)
        }
    
    
}



