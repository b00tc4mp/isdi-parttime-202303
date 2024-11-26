import { savePost, saveUser } from "../data";
import { findUserById, findPostByPostId } from "./helpers/dataManagers";
import { validateId } from "./helpers/validators";


export default function likeAPost(userId, post) {
    validateId(userId);
    let foundUser = findUserById(userId);
    let foundPost = findPostByPostId(post.id);

    if (!foundUser) throw new Error("There is no user with this id");
    if (!foundPost) throw new Error("There is no post with this post id")

    if (foundPost.likeCounter.includes(foundUser.id)) {

        const foundUserIndex = foundPost.likeCounter.indexOf(foundUser.id)
        foundPost.likeCounter.splice(foundUserIndex, 1);

        savePost(foundPost);
        return;
    }

    foundPost.likeCounter.push(foundUser.id);
    savePost(foundPost);
}