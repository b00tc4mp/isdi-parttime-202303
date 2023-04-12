import { homePage } from "../pages/home-page.js";
import { posts, users } from '../data.js'
import { cutText} from './max-characters.js'
import { getCurrentUser, getUserName } from "./helpers/data-managers.js";



export function renderPosts(userId) {
    const existentArticleElement = homePage.querySelector('.posts')
    
    existentArticleElement.innerHTML = ''
    if( posts.length >= 1) {
    
        let recentPostsFirst = posts.reverse()
    
        recentPostsFirst.forEach(article => {
            const date = article.date
            const author = users.find(user => user.id === article.author).name
            // const author = users.find(user => user.id === article.author).name 
            const postsList = existentArticleElement

            if(userId !== author) {
                const postContainer = document.createElement('article')
                postsList.appendChild(postContainer)
                postContainer.innerHTML = `
                    <img src="${article.image}" >
                    <h3 class="title">${article.title}</h3>
                    <p class="excerpt">${cutText(article.text, 35)}</p>
                    <div class="date-author">
                        <div class="post-author">
                            ${author}
                        </div>
                        <div class="post-date">
                            <time>    ${article.date.toLocaleString()}</time>
                        </div>
                        </div>
                        `    
            }
            
        })
        recentPostsFirst = posts.reverse()
    }
}

export function renderUserPosts(userId) {
    const existentArticleElement = homePage.querySelector('.posts')
    
    existentArticleElement.innerHTML = ''
    if( posts.length >= 1) {
    
        let recentPostsFirst = posts.reverse()
    
        recentPostsFirst.forEach(article => {

            const author = users.find(user => user.id === article.author).name 
            const postsList = existentArticleElement

            if(userId === article.author) {
                const postContainer = document.createElement('article')
                postsList.appendChild(postContainer)
                postContainer.innerHTML = `
                    <img src="${article.image}" >
                    <h3 class="title">${article.title}</h3>
                    <p class="excerpt">${cutText(article.text, 35)}</p>
                    <div class="date-author">
                        <div class="post-author">
                            ${author}
                        </div>
                        <div class="post-date">
                            ${article.date.getDate()}/${article.date.getMonth() + 1}/${article.date.getFullYear()}
                        </div>
                    </div>
                    `    
            }
            
        })
        recentPostsFirst = posts.reverse()
    }
}

export function renderLastPost(userId) {
    const existentArticleElement = homePage.querySelector('.posts')
    let recentPostsFirst = posts.reverse()
    const postsList = existentArticleElement
    existentArticleElement.innerHTML = ''
    if( posts.length >= 1) {
    
    
        for(let i = posts.length; i > 0; i--) {
            const lastPost = posts.find(post => post.author === userId)
            const author = users.find(user => user.id === lastPost.author).name
            if (lastPost) {
                const postContainer = document.createElement('article')
                console.log(author)

                postsList.appendChild(postContainer)
                return postContainer.innerHTML = `
                    <img src="${lastPost.image}" >
                    <h3 class="title">${lastPost.title}</h3>
                    <p class="excerpt">${cutText(lastPost.text, 35)}</p>
                    <div class="date-author">
                        <div class="post-author">
                            ${author}
                        </div>
                        <div class="post-date">
                            ${lastPost.date.getDate()}/${lastPost.date.getMonth() + 1}/${lastPost.date.getFullYear()}
                        </div>
                    </div>
                    `    
            }
        }


        // recentPostsFirst.forEach(article => {

        //     const author = users.find(user => user.id === article.author).name 
        //     const postsList = existentArticleElement

        //     if(userId === article.author) {
        //         const postContainer = document.createElement('article')
        //         postsList.appendChild(postContainer)
        //         postContainer.innerHTML = `
        //             <img src="${article.image}" >
        //             <h3 class="title">${article.title}</h3>
        //             <p class="excerpt">${cutText(article.text, 35)}</p>
        //             <div class="date-author">
        //                 <div class="post-author">
        //                     ${author}
        //                 </div>
        //                 <div class="post-date">
        //                     ${article.date.getDate()}/${article.date.getMonth() + 1}/${article.date.getFullYear()}
        //                 </div>
        //             </div>
        //             `    
        //     }
            
        // })
        recentPostsFirst = posts.reverse()
    }
}
