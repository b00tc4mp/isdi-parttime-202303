import { users } from "../data.js";



export default function setExistingAvatar(authenticatedUserId, defaultUrl, avatarImage){
    const currentUser = users.find( user => user.id === authenticatedUserId);
    if (currentUser.avatar){
        avatarImage.src = currentUser.avatar;
        return;
    }
    avatarImage.src = defaultUrl;
}


