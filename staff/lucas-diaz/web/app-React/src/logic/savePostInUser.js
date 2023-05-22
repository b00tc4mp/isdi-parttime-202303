import { saveUser } from "../data";
import { findUserById } from "./helpers/dataManagers";
import { validateId } from "./helpers/validators";

export default function savePostInUser(userId, post){
    validateId(userId);
    let foundUser = findUserById(userId);
    if (!foundUser) throw new Error("There is no user with this id");

    // si lo tiene, buscarlo y eliminarlo 
    if (foundUser.savedPosts.includes(post.id)){
        const index = foundUser.savedPosts.indexOf(post.id)
        foundUser.savedPosts.splice(index,1)
        saveUser(foundUser);
        return;
    }
    //si no lo tiene pushear el id del post 
    if (!foundUser.savedPosts.includes(post.id)){
        foundUser.savedPosts.push(post.id)
    }
    // guardar datos en el user
    saveUser(foundUser); 
}