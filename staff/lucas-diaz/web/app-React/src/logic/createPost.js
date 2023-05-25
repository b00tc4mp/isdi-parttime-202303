import { validateId, validateUrl, validateText } from "./helpers/validators.js";
import { loadPosts, savePosts, findUserById } from "../data.js";

export default function createPost(userId, image, text, callback) {
    validateId(userId);
    validateUrl(image);
    validateText(text);

    findUserById(userId, foundUser => {

        if (!foundUser) {
            callback(new Error(`user with id ${userId} not found`));
            return;
        }

        loadPosts(_posts => {
            
            let id = "post-1";
            const lastPost = _posts.at(-1);
            if (lastPost) {
                id = "post-" + (parseInt(lastPost.id.slice(5)) + 1)
            }
            const post = {
                id,
                author: userId,
                userName: foundUser.name,
                image,
                text,
                date: new Date,
                likeCounter: []
            }
            _posts.push(post);

            savePosts(_posts, () => callback(null));

        })
    });
}