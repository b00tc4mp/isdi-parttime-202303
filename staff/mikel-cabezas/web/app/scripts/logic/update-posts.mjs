import { homePage } from "../pages/home-page.mjs";
import { posts, users } from '../data.mjs'
import { cutText} from './max-characters.mjs'
import { validateId } from "./helpers/validators.mjs";
import { context } from '../ui.mjs'
import { renderPosts } from "./render-posts.mjs";


export function updatePosts(userId) {
    
    validateId(userId)

    const loggedIn = users.some( user => {
        if(user.id === userId) {
            user.id = userId
            return true
        }
    })
    if (!loggedIn) {
        throw new Error('Not logged In')
    }
    renderPosts()
}

// TODO steps
    // check user with userId exists
    // create post id
    // create post object and add author, image, text, and date (new Date) properties
    // add post to posts array