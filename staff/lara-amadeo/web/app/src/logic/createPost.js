import { posts } from "../data.js";
import { findUserbyId } from "./helpers/data-managers.js";

export function createPost(userId, image, text){

    const user = findUserbyId(userId)

    if(!user) throw new Error(`User with id ${userId} not found`)

    const lastPostId = posts[posts.length - 1].id
    const newPostId = 'post-' + (Number((lastPostId).slice(5)) + 1)

    const newPost = {
        id: newPostId,
        author: userId,
        image,
        text,
        date: new Date
    }

    posts.push(newPost)
}