import { validateId } from "./helpers/validators.mjs";
import { users, posts } from "../data.mjs";


export default function retrievePosts (userId) {
    validateId(userId);

    const foundUser = users.some(user => user.id === userId)
    
    if (!foundUser) throw new Error (`there is no user with this current ${userId} id`);

    return posts.toReversed();
}