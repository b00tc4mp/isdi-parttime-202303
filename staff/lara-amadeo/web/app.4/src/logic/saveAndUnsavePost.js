import { posts, saveUserInStorage, users } from "../data";

export default function saveAndUnsavePost(post, userId){
    const _posts = posts()
    const _users = users()

    const _post = _posts.find(_post => _post.id === post.id)
    const _user = _users.find(_user => _user.id === userId)

    if(_user.savedPosts){

        const postAlreadySavedByUser = _user.savedPosts.includes(_post.id)

        if(!postAlreadySavedByUser){
            _user.savedPosts.push(_post.id)
            saveUserInStorage(_user)
        } else {
            const index = _user.savedPosts.findIndex(elem => elem === _post.id)
            _user.savedPosts.splice(index, 1)
            saveUserInStorage(_user)
        }
    } else {
        _user.savedPosts = []

        _user.savedPosts.push(_post.id)
        saveUserInStorage(_user)
    }
}