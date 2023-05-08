import { findUserById, findUserPostByPostId } from "./helpers/dataManagers";
import { validateId } from "./helpers/validators";

export default function updatePostLikeIcon(userId, post, likeIcon, likeIconText){
    validateId(userId);

    let foundUser = findUserById(userId);
    let foundPost = findUserPostByPostId(post.id);

    if (post.likeCounter && foundPost.likeCounter.includes(foundUser.id)){
        likeIcon.classList.add("material-symbols-rounded-liked");
        likeIconText.textContent = `${foundPost.likeCounter.length} ${foundPost.likeCounter.length === 1 ? "like" : "likes"}`
    } else {
        likeIcon.classList.remove("material-symbols-rounded-liked");
        likeIconText.textContent = `${foundPost.likeCounter.length} ${foundPost.likeCounter.length === 1 ? "like" : "likes"}`
    }
}