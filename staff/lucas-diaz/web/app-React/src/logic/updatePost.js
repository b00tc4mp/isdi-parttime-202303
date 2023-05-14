import { savePost } from "../data";
import { findUserById, findPostByPostId } from "./helpers/dataManagers";
import { validateId, validateText, validateUrl } from "./helpers/validators";

export default function updatePost(userId, postId, image, text){
    validateId(userId);
    validateUrl(image);
    validateText(text);

    const foundUser = findUserById(userId);
    if (!foundUser) throw new Error (`user with id ${userId} not found`);

    const foundPost = findPostByPostId(postId);
    if (!foundPost) throw new Error (`post with id ${postId} not found`);

    if (foundUser.id !== foundPost.author) throw new Error ("The current user Id doesnt belong to post Id");

    foundPost.image = image;
    foundPost.text = text;
    savePost(foundPost);
}