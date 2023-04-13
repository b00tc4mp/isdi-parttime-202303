import {validateId, validateUrl } from "./helpers/validators.js"
import { users } from "../data.js";

export default function renderuser(userId, welcomeMessage, DEFAUTL_AVATAR, avatarImage){
    validateId(userId);
    validateUrl(DEFAUTL_AVATAR);
    const currentUser = users.find( user => user.id === userId);
    welcomeMessage.textContent = `${currentUser.name}`;


    if (currentUser.avatar){
        avatarImage.src = currentUser.avatar;
        return;
    }
    avatarImage.src = DEFAUTL_AVATAR;
} 