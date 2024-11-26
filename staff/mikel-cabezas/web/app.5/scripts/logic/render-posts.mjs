import { homePage } from "../pages/home-page.mjs";
import { posts } from '../data.mjs'
import { cutText} from './max-characters.mjs'



export function renderPosts () {

    const existentArticleElement = homePage.querySelector('.posts')
    
    if(existentArticleElement) {
        existentArticleElement.innerHTML = ''
    }
    if( posts.length >= 1) {
    
        const recentPostsFirst = posts.toReversed()
    
        recentPostsFirst.forEach(article => {
            const day = article.date.getDate()
            const month = article.date.getMonth() + 1
            const year = article.date.getFullYear()
            const author = article.author
            const postsList = existentArticleElement
            const printImage = article.image
            const printText = article.text
            const printTitle = article.title
            const printAuthor = author
            const printDate = `${day}/${month}/${year}`


 

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
                            ${article.date.getDate()}/${article.date.getMonth() + 1}/${article.date.getFullYear()}
                        </div>
                    </div>
                </article>
                `
            }, '')

            
        })
    }
}
