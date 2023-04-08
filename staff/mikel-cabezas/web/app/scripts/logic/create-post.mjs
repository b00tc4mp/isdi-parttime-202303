import { context, toggleOffClassInSection } from "../ui.mjs";
import { getCurrentUser } from "./helpers/data-managers.mjs";
import { homePage } from "../pages/home-page.mjs";

export function createPost(userId, image, text) {
    toggleOffClassInSection(homePage.querySelector('.overlay.create-post'))


    const user = getCurrentUser(userId)

    if (!user) {
        throw new Error(`User with ${userId} not found`)
    }

}

// TODO steps
    // check user with userId exists
    // create post id
    // create post object and add author, image, text, and date (new Date) properties
    // add post to posts array