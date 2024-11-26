import { validateId } from "./helpers/validators";
import { users, posts, savePosts } from "../data";


export default function deletePost(userId, postId) {
    validateId(userId);

    const foundUser = users().some(user => user.id === userId)

    if (!foundUser) throw new Error(`there is no user with this current ${userId} id`);

    const _posts = posts()

    const foundPostIndex = _posts.findIndex(post => post.id === postId)

    if (foundPostIndex !== -1) { 
        _posts.splice(foundPostIndex, 1); 
    }

    savePosts(_posts)
}
