import { users } from "../data"
import { context, hideContainer, showContainer } from "../ui"
import retrievePosts from "./retrive-posts"
import { homePageMain, homePostEdit } from "../pages/home-page"
import toggleLikePost from "./toggle-like-post"


export default function showPostFeed() {
    try {
        const posts = retrievePosts(context.userID)
        homePageMain.querySelector('.home__post--feed').innerHTML = ''

        posts.forEach(post => {
            const _users = users()

            const postItem = document.createElement('article')
            postItem.classList.add('inputs__box--feed')

            const postInfo = document.createElement('div')
            postInfo.classList.add('home__post--info')

            const postUser = document.createElement('div')
            postUser.classList.add('post__info--user')

            const image = document.createElement('img')
            image.classList.add('home__post--image')
            image.src = post.image

            const text = document.createElement('p')
            text.classList.add('text')
            text.innerText = post.text

            const date = document.createElement('time')
            date.classList.add('text')
            date.innerText = post.date

            let userName = document.createElement('p')
            userName.classList.add('text')

            let avatar = document.createElement('img')
            avatar.classList.add('post__avatar')

            for (const user of _users) {
                if (post.author === user.id) {
                    avatar.src = user.avatar
                    userName.innerText = user.name
                }
            }

            postUser.append(avatar, userName)

            const likeButton = document.createElement('img')
            likeButton.classList.add('like-button')
            likeButton.src = post.likes && post.likes.includes(context.userID) ? './images/heart-filled.png' : './images/heart-empty.png'

            const likeCounter = document.createElement('p')
            likeCounter.innerText = post.likes ? post.likes.length : ''

            likeButton.onclick = () => {
                try {
                    toggleLikePost(context.userID, post.id)

                    showPostFeed()
                } catch(error) {
                    alert(error.message)
                }
            }

            if (post.author === context.userID) {
                const button = document.createElement('button')
                button.innerText = 'Edit'

                button.onclick = () => {
                    homePostEdit.querySelector('input[type=hidden]').value = post.id
                    homePostEdit.querySelector('input[type=url]').value = post.image
                    homePostEdit.querySelector('textarea').value = post.text

                    showContainer(homePostEdit)
                    hideContainer(homePageMain)
                }

                postInfo.append(postUser, date, likeButton, likeCounter, button)
            } else {
                postInfo.append(postUser, date, likeButton, likeCounter)
            }

            postItem.append(image, text, postInfo)

            homePageMain.querySelector('.home__post--feed').appendChild(postItem)
        });
        
        return true
    } catch(error) {
        alert(error.message)
    }
}