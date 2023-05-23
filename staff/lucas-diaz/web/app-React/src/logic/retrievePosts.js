import { validateId } from "./helpers/validators.js";
import { loadUsers, posts } from "../data.js";


export default function retrievePosts (userId, callback) {
    validateId(userId);

    loadUsers(foundUser => {
        const found = foundUser.some(user => user.id === userId)
        
        if (!found){
            callback(new Error (`there is no user with this current ${userId} id`));
            return
        } 
    
        callback(null, posts().toReversed());
    })
}