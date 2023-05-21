import { validateId } from "./helpers/validators.js";
import { users, posts } from "../data.js";


export default function retrieveSavedPosts (userId,posts) {
    validateId(userId);

    const foundUser = users().some(user => user.id === userId)
    
    if (!foundUser) throw new Error (`there is no user with this current ${userId} id`);

    // tenemos que localizar los posts guardados del user
    
    // Tenemos que filtrar dentro de los posts 
}