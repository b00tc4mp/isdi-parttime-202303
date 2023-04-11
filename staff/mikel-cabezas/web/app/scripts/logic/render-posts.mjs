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
            const articleElement = document.createElement('article')
            const imageContainer = document.createElement('div')
            const printImage = document.createElement('img')
            const printText = document.createElement('p')
            const printTitle = document.createElement('h3')
            const dateAndAuthor = document.createElement('div')
            const printDate = document.createElement('div')
            const printAuthor = document.createElement('div')
            printText.classList.add('excerpt')
            printTitle.classList.add('title')
            dateAndAuthor.classList.add('date-author')
            printDate.classList.add('post-date')
            printAuthor.classList.add('post-author')
            homePage.querySelector('.posts').appendChild(articleElement)
            articleElement.appendChild(printImage)
            articleElement.appendChild(printTitle)
            articleElement.appendChild(printText)
            articleElement.appendChild(dateAndAuthor)
            dateAndAuthor.appendChild(printAuthor)
            dateAndAuthor.appendChild(printDate)
            printImage.src = article.image
            printTitle.innerText = article.title
            printDate.innerText = `${day}/${month}/${year}`
            printAuthor.innerText = author
            const textToCut = article.text
            if(textToCut.length > 35) {
                printText.innerText = cutText(textToCut, 35)
            } else {
                printText.innerText = article.text
            }
        })
    }
}
