import { homePage } from "../pages/home-page.js";
import { posts, users } from '../data.js'
import { cutText} from './max-characters.js'
import { validateId } from "./helpers/validators.js";
import { context } from '../ui.js'
import { renderPosts } from "./render-posts.js";


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
    renderPosts(userId)
    // renderLastPost(userId)
}

// TODO steps
    // intentar filtrar desde aqui los posts que se devuelven