import {validateId, validateUrl } from "./helpers/validators.js"
import { saveUser, findUserById } from "../data.js";


export default function updateUserAvatar(authenticatedUserId, avatarUrl)  { 
    validateId(authenticatedUserId);
    validateUrl(avatarUrl);

    const foundUser = findUserById(authenticatedUserId);

    if (!foundUser) throw new Error("user not found");
    
    foundUser.avatar = avatarUrl;
    
    saveUser(foundUser);
}
