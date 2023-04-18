import { savePosts, saveUsers } from "../data";
import { findUserById, findUserPostByPostId } from "./helpers/data-managers";
import { validateId } from "./helpers/validators";


export default function likeAPost(userId, post, likeIconText){
    validateId(userId);

    let foundUser = findUserById(userId);
    let foundPost = findUserPostByPostId(post.id);

    if (!foundUser)  throw new Error ("There is no user with this id");
    if (!foundPost)  throw new Error ("There is no post with this post id")


    // si tiene la clase, se la quitamos --("material-symbols-rounded-liked")


    
    // si no la tiene, se la damos 



    // Tenemos que separar esta logica entre los 2 de arriba 
    if(foundUser.likedPosts.includes(foundPost.id)){
        const index = foundUser.likedPosts.indexOf(foundPost.id);
        foundUser.likedPosts.splice(index,1);
        foundPost.likeCounter -= 1;
        likeIconText.textContent = `${foundPost.likeCounter} likes`
        savePosts();
        saveUsers();
        return;
    }

    foundUser.likedPosts.push(foundPost.id);
    foundPost.likeCounter += 1;
    likeIconText.textContent = `${foundPost.likeCounter} likes`
    savePosts();
    saveUsers();
}