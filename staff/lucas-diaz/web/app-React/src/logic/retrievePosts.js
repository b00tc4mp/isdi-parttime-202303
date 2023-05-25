import { validateId } from "./helpers/validators.js";
import { loadUsers, loadPosts } from "../data.js";


export default function retrievePosts (userId, callback) {
    validateId(userId);

    loadUsers(foundUser => {
        const found = foundUser.some(user => user.id === userId)
        
        if (!found){
            callback(new Error (`there is no user with this current ${userId} id`));
            return
        } 
    
        loadPosts((posts) => {

            callback(null, posts.toReversed());
        }) 
    })
}