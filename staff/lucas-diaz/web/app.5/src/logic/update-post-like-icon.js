import { findUserById, findUserPostByPostId } from "./helpers/data-managers";
import { validateId } from "./helpers/validators";

export default function updatePostLikeIcon(userId, post, likeIcon){
    validateId(userId);

    let foundUser = findUserById(userId);
    let foundPost = findUserPostByPostId(post.id);

    if (foundPost.likeCounter.includes(foundUser.id)){
        likeIcon.classList.add("material-symbols-rounded-liked");
    } else {
        likeIcon.classList.remove("material-symbols-rounded-liked");
    }
}