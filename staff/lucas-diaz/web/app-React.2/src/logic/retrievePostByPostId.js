import { validateId } from "./helpers/validators";
import { findPostByPostId, findUserById } from "./helpers/dataManagers";

export default function retrievePostByPostId (userId, postId){
    validateId(userId);

    const foundUser = findUserById(userId)
    
    if (!foundUser) throw new Error (`there is no user with this current ${userId} id`);

    return findPostByPostId(postId);
}