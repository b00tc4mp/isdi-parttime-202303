import { users } from "../data.js";

export default function addUserNameInHeader (authenticatedUserId, welcomeMessage) {
    const currentUser = users.find( user => user.id === authenticatedUserId);
    welcomeMessage.textContent = currentUser.name;
}