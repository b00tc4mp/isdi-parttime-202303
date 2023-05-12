import { savePost, saveUser } from "../data";
import { findUserById, findUserPostByPostId } from "./helpers/dataManagers";
import { validateId } from "./helpers/validators";


export default function likeAPost(userId, post) {
    validateId(userId);
    let foundUser = findUserById(userId);
    let foundPost = findUserPostByPostId(post.id);

    if (!foundUser) throw new Error("There is no user with this id");
    if (!foundPost) throw new Error("There is no post with this post id")

    if (foundPost.likeCounter.includes(foundUser.id)) {

        const foundPostIndex = foundUser.likedPosts.indexOf(foundPost.id);
        foundUser.likedPosts.splice(foundPostIndex, 1);

        const foundUserIndex = foundPost.likeCounter.indexOf(foundUser.id)
        foundPost.likeCounter.splice(foundUserIndex, 1);

        savePost(foundPost);
        saveUser(foundUser);
        return;
    }

    foundUser.likedPosts.push(foundPost.id);
    foundPost.likeCounter.push(foundUser.id);


    savePost(foundPost);
    saveUser(foundUser);
}