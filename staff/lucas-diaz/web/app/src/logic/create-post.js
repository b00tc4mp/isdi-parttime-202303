import { validateId, validateUrl, validateText } from "./helpers/validators.js";
import { posts, savePosts } from "../data.js";
import { findUserById } from "./helpers/data-managers.js";

export default  function createPost(userId, image, text){
    validateId(userId);
    validateUrl(image);
    validateText(text);

    const foundUser = findUserById(userId);

    if (!foundUser) throw new Error (`user with id ${userId} not found`);

    let id = "post-1";
    const lastPost = posts.at(-1);
    if (lastPost){
        id = "post-" + (parseInt(lastPost.id.slice(5)) +1)
    }
    const post = {
        id,
        author: userId,
        userNameAvatar: foundUser.avatar,
        userName: foundUser.name,
        image,
        text,
        date: new Date
    }

    posts.push(post);
    savePosts();
}