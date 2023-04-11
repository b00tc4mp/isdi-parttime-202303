import { validateId, validateUrl, validateText } from "../logic/helpers/validators.mjs";
import { users, posts } from "../data.mjs";

export default  function createPost(userId, image, text){
    validateId(userId);
    validateUrl(image);
    validateText(text);

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) throw new Error (`user with id ${userId} not found`);

    let id = "post-1";
    const lastPost = posts.at(-1);
    if (lastPost){
        id = "post-" + (parseInt(lastPost.id.slice(5)) +1)
    }
    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date
    }

    posts.push(post);
}