import {users, posts} from "../data.js"
import {userExistById} from "./helpers/data-manager.js"

export function createPost(userId, image, text) {

    const user = users[userExistById(userId)];

    if (user===-1) throw new Error(`user with id ${userId} not found`);

    let id = 'post-1';

    const lastPost = posts[posts.length - 1];

    if (lastPost)
        id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1);

    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date
    }

    posts.push(post);
}