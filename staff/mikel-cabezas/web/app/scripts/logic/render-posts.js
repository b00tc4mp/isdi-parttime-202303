import { homePage } from "../pages/home-page.js";
import { posts, savePosts, saveUsers, users } from '../data.js'
import { cutText} from './max-characters.js'
import { toggleOffClassInSection, context } from "../ui.js";
import {returnUserImage } from "./helpers/get-user-image.js";
// import {default as homePage} from "../pages/home-page.js";
import { getPostUserName, getPostUserImage, getUserImage, findUserById } from "./helpers/data-managers.js"
import { imageToBase64 } from "../localImagesBase64.js";

export function renderPosts(userId) {
    const existentArticleElement = homePage.querySelector('.posts')
    existentArticleElement.innerHTML = ''
    if( posts.length >= 1) {
        let recentPostsFirst = posts.toReversed()
        let currentPost
        recentPostsFirst.forEach(article => {
            const date = article.date
            const currentUser = findUserById(userId)

    


            const author = users.find(user => user.id === article.author)
            const authorID = users.find(user => user.id === article.author).id
            const postId = article.id

            const postsList = existentArticleElement
            const postContainer = document.createElement('article')

            postContainer.classList.add(postId)
            postsList.appendChild(postContainer)

                const postAuthor = document.createElement('div')
                postAuthor.classList.add('post-author')
                postContainer.appendChild(postAuthor)

                    const avatar = document.createElement('div')
                    avatar.classList.add('avatar')
                    postAuthor.appendChild(avatar)

                        const letter = document.createElement('div')
                        letter.classList.add('letter')
                        avatar.appendChild(letter)


                        const imageProfile = document.createElement('img')
                        imageProfile.classList.add('image-profile')
                        imageProfile.classList.add('hidden')
                        avatar.appendChild(imageProfile)


                    const userName = document.createElement('div')
                    userName.classList.add('user-name')
                    postAuthor.appendChild(userName)

                const postImage = document.createElement('img')
                postContainer.appendChild(postImage)
                postImage.src = article.image
                // imageToBase64(postImage, postImage.src)

                const titleAndInteractions = document.createElement('div')
                titleAndInteractions.classList.add('title-and-interactions')
                postContainer.appendChild(titleAndInteractions)
                const totalLikesPost = document.createElement('div')
                postContainer.appendChild(totalLikesPost)
                const postIdIndex = postId.slice(5)
                if(article.likes) {
                    totalLikesPost.innerText = article.likes + ' likes'

                }

                const postTitle = document.createElement('h3')
                postTitle.classList.add('title')
                titleAndInteractions.appendChild(postTitle)
                postTitle.innerText = article.title


                const likePost = document.createElement('div')
                likePost.classList.add('material-symbols-outlined')
                likePost.classList.add('like')
                totalLikesPost.classList.add('total-likes-post')
                titleAndInteractions.appendChild(likePost)
                likePost.innerText = 'favorite'

                const isLikedPost = currentUser.likedPosts.find(post => post === postId)
                if(isLikedPost === postId) {
                    likePost.classList.add('liked')
                }
                likePost.onclick = (event) => {
                    const currentUser = findUserById(userId)
                    const userLikedPosts = currentUser.likedPosts
                    const postId = article.id.slice(5)
                    const indexLikedPost = currentUser.likedPosts.findIndex(post => post === postId)

                    if(likePost.classList.contains('liked')) {
                        likePost.classList.remove('liked')
                        currentUser.likedPosts.splice(indexLikedPost, 1)
                        if (posts[postId - 1].likes > 1) {
                            posts[postId - 1].likes-- + ' likes'
                            totalLikesPost.innerText = posts[postId].likes
                        }
                        if (posts[postId - 1].likes === 1) {
                            posts[postId - 1].likes-- + ' likes'
                            totalLikesPost.innerText = ''
                        }

                    } else {
                        likePost.classList.add('liked')

                            posts[postId - 1].likes++ + ' likes'
                            totalLikesPost.innerText = posts[postId - 1].likes
    
                        if(isLikedPost !== postId) {
                            
                            currentUser.likedPosts.push(article.id)
                        }
                    }
                    saveUsers()
                    savePosts()
                }


                const postExcerpt = document.createElement('p')
                postExcerpt.classList.add('excerpt')
                postContainer.appendChild(postExcerpt)
                postExcerpt.innerText = cutText(article.text, 35)

                const postDate = document.createElement('time')
                postDate.classList.add('post-date')
                postContainer.appendChild(postDate)
                postDate.innerText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`



                const user = author.name
                const userImage = getUserImage(author.id)
                const separateUserName = user.split(' ')
                userName.innerText = user
                if (userImage) {
                    imageProfile.src = userImage
                    imageProfile.classList.remove('hidden')
                }
            
                if (!userImage && separateUserName.length === 1) {
                    letter.innerText = separateUserName[0][0] + separateUserName[0][1]
                }
                if (!userImage && separateUserName.length > 1) {
                    letter.innerText = separateUserName[0][0] + separateUserName[1][0]
                }


            if(userId === authorID) {
                const editForm = document.querySelector('.section.home').querySelector('form.edit-post')
                const editButton = document.createElement('button')
                const editButtonIcon = document.createElement('i')
                editButtonIcon.classList.add('uil-pen')
                editButtonIcon.classList.add('uil')
                editButton.classList.add('edit')
                editButton.classList.add(postId)
                editButton.innerText = 'edit'
                postAuthor.appendChild(editButton)
                editButton.appendChild(editButtonIcon)
                editButton.onclick = (event) => {
                    const postId = event.target.classList.value.split(' ').pop()
                    toggleOffClassInSection(homePage.querySelector('.overlay.edit-post'))
                    const file = document.querySelector('.section.home').querySelector('form.edit-post input[name="file"]')
                    const postImage = document.querySelector('.section.home').querySelector('form.edit-post .post-image')
                    
                    const currentPost = postId.slice(5) - 1
                    const currentImage = posts[currentPost].image
                    postImage.src = currentImage
        
                    const postIdInput = document.querySelector(`form.edit-post input[type="hidden"]`)
                    postIdInput.classList.add(`${postId}`)
        
                    const postTitle = document.querySelector('.section.home').querySelector('form.edit-post .title')
                    const postText = document.querySelector('.section.home').querySelector('form.edit-post textarea')
        
                    
                    // imageToBase64(file, postImage.src)
                    
                    const printImage = file.onchange = function (event) {
                        const file = event.target.files[0]
                        const image = new FileReader()
                        image.onload = () => {
                            const base64 = image.result
                            postImage.src = base64
                        }
                        image.readAsDataURL(file)
                    }
                    postImage.src = posts[currentPost].image
                    postTitle.value = posts[currentPost].title
                    postText.value = posts[currentPost].text
                }
            }
        })
    }
}

