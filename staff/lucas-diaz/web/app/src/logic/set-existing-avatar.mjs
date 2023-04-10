import { users } from "../data.mjs";



export default function setExistingAvatar(authenticatedUserId, defaultUrl, avatarImage){
    const currentUser = users.find( user => user.id === authenticatedUserId);
    if (currentUser.avatar){
        avatarImage.src = currentUser.avatar;
        return;
    }
    avatarImage.src = defaultUrl;
}


