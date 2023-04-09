import { context, toggleOffClassInSection } from "../ui.mjs";
import { homePage } from "../pages/home-page.mjs";
import { getUserName } from "./helpers/data-managers.mjs";
import { posts } from '../data.mjs'
export function updatePosts() {
    const existentArticleElement = homePage.querySelector('.posts')
    if(existentArticleElement) {
        existentArticleElement.innerHTML = ''
    }
    if( posts.length >= 1) {
        posts.forEach(article => {
            const articleElement = document.createElement('article')
            const printImage = document.createElement('img')
            const printText = document.createElement('p')
            const printTitle = document.createElement('h3')
            printText.classList.add('excerpt')
            printTitle.classList.add('title')
            homePage.querySelector('.posts').appendChild(articleElement)
            articleElement.appendChild(printImage)
            articleElement.appendChild(printTitle)
            articleElement.appendChild(printText)
            // const printImage = homePage.querySelector('.posts img')
            // const printText = homePage.querySelector('.posts .text')
            printImage.src = article.image
            printTitle.innerText = article.title
            printText.innerText = article.text.substring(0, 60) + '...'
    
            //  cutText(printText, 60)
        })
    
    }

    // const existentArticleElement = homePage.querySelector('.posts').children.length
    // if( posts.length >= 1) {
    //     posts.forEach(article => {
    //         if(article.id > existentArticleElement ) {

    //         } else { 

    //             const articleElement = document.createElement('article')
    //             const printImage = document.createElement('img')
    //             const printText = document.createElement('p')
    //             const printTitle = document.createElement('h3')
    //             printText.classList.add('excerpt')
    //             printTitle.classList.add('title')
    //             homePage.querySelector('.posts').appendChild(articleElement)
    //             articleElement.appendChild(printImage)
    //             articleElement.appendChild(printTitle)
    //             articleElement.appendChild(printText)
    //             printImage.src = article.image
    //             printTitle.innerText = article.title
    //             printText.innerText = article.text.substring(0, 60) + '...'
    //         }
    
    //     })
    
    // }


}

// TODO steps
    // check user with userId exists
    // create post id
    // create post object and add author, image, text, and date (new Date) properties
    // add post to posts array