import {validateId, validateUrl } from "./helpers/validators.js"
import { findUserById } from "./helpers/data-managers.js";


export default function updateUserAvatar(authenticatedUserId, url)  { 
    validateId(authenticatedUserId);
    validateUrl(url);
    const foundUser = findUserById(authenticatedUserId);
    if (!foundUser) throw new Error("user not found");
    foundUser.avatar = url;
}
