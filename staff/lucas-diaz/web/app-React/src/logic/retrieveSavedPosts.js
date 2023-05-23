import { validateId } from "./helpers/validators.js";
import { findUserById } from "../data.js";


export default function retrieveSavedPosts(userId, posts) {
    validateId(userId);

    const foundUser = findUserById(userId);

    if (!foundUser) throw new Error(`there is no user with this current ${userId} id`);

    if (foundUser.savedPosts.length > 0) {
        const savedPosts = posts.filter((post) => foundUser.savedPosts.includes(post.id));
        return savedPosts;
    } else {
        return [];
    }
}