import { homePage } from "../pages/home-page.js";
import { posts } from '../data.js'
import { cutText} from './max-characters.js'
import { getCurrentUser } from "./helpers/data-managers.js";



export function renderPosts(userID, userPosts) {
    const currentUser = getCurrentUser(userID)

    const existentArticleElement = homePage.querySelector('.posts')
    
    existentArticleElement.innerHTML = ''
    if( posts.length >= 1) {
    
        let recentPostsFirst = posts.reverse()
    


            const postsList = existentArticleElement

                postsList.innerHTML = posts.reduce((accumulator, post) => {

                    return accumulator + `<article>
                        <img src="${post.image}" >
                        <h3 class="title">${post.title}</h3>
                        <p class="excerpt">${cutText(post.text, 35)}</p>
                        <div class="date-author">
                            <div class="post-author">
                                ${post.author}
                            </div>
                            <div class="post-date">
                                ${post.date.getDate()}/${post.date.getMonth() + 1}/${post.date.getFullYear()}
                            </div>
                        </div>
                    </article>
                    `
                }, '')

        recentPostsFirst = posts.reverse()
    }
}
