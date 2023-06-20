import { retrieveUser } from "./helpers/data-managers.js"
import { context } from "../ui.js"

export function renderUser(sidebarUsername, sidebarEmail, sidebarAvatar, topbarAvatar) {
    const user = retrieveUser(context.userId)

    sidebarUsername.innerHTML = user.username
    sidebarEmail.innerHTML = user.email
    sidebarAvatar.src = user.avatar
    topbarAvatar.src = user.avatar
}