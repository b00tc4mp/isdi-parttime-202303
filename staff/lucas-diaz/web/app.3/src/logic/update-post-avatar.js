import { savePosts } from "../data";
import { findUserById, findUserPostByUserId } from "./helpers/data-managers";
import { validateId } from "./helpers/validators";


export default function updatePostAvatar(contextUserId){
    validateId(contextUserId);
    
    const user = findUserById(contextUserId);
    const userPost = findUserPostByUserId(contextUserId);

    if (!userPost){
        return;
    }
    if (user.avatar !== userPost.userNameAvatar){
        userPost.userNameAvatar = user.avatar;
    }
    savePosts();
}

