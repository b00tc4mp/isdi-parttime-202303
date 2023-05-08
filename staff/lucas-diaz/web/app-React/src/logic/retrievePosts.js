import { validateId } from "./helpers/validators.js";
import { users, posts } from "../data.js";


export default function retrievePosts (userId) {
    validateId(userId);

    const foundUser = users().some(user => user.id === userId)
    
    if (!foundUser) throw new Error (`there is no user with this current ${userId} id`);

    return posts().toReversed();
}