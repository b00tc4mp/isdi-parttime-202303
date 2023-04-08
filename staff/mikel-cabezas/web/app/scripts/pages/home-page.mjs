import { createPost } from "../logic/create-post.mjs"
import { context } from "../ui.mjs"
import { posts } from '../data.mjs'

export const homePage = document.querySelector('.section.home')

const image = homePage.querySelector('.overlay.create-post form > input[name="file"') 
const text = homePage.querySelector('.overlay.create-post form > input[name="text"') 


console.log(posts)
if( posts.length >= 1) {

    posts.forEach(article => {
    const articleElement = document.createElement('article')
    const printImage = document.createElement('img')
    const printText = document.createElement('div')
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
    printText.innerText = article.text

    
})
    // for ( post of posts ) {
        // homePage.innerHTML += `
        //     <div class="post">
        //         <img src="${post.image}" alt="${post.title}">
        //         <h2>${post.title}</h2>
        //         <p>${post.text}</p>
        //     </div>
        // `
    // }

}


homePage.querySelector('button.create-post').onclick = function(event) {
    const userId = context.userId
    event.preventDefault()
    console.log(userId)
    if (userId !== null) {
        createPost(userId, image, text)
    }
}

