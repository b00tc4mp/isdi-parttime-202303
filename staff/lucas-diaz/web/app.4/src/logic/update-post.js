import { savePosts } from "../data";
import { findUserById, findUserPostByPostId } from "./helpers/data-managers";
import { validateId, validateText, validateUrl } from "./helpers/validators";

export default function updatePost(userId, postId, image, text){
    validateId(userId);
    validateUrl(image);
    validateText(text);

    const foundUser = findUserById(userId);
    if (!foundUser) throw new Error (`user with id ${userId} not found`);

    const foundPost = findUserPostByPostId(postId);
    if (!foundPost) throw new Error (`post with id ${postId} not found`);

    if (foundUser.id !== foundPost.author) throw new Error ("The current user Id doesnt belong to post Id");

    foundPost.image = image;
    foundPost.text = text;
    savePosts();
}