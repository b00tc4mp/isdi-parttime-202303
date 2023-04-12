import {validateId, validateUrl } from "./helpers/validators.js"
import { users } from "../data.js";


export default function updateUserAvatar(authenticatedUserId, url)  { 
    validateId(authenticatedUserId);
    validateUrl(url);
    const foundUser = users.find(user => user.id === authenticatedUserId);
    if (!foundUser) throw new Error("user not found");
    foundUser.avatar = url;
}
