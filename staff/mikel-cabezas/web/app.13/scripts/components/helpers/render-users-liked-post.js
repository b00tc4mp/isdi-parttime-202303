import { returnUserImage } from "../../logic/users/get-user-image.js"
import { addClassOnContainer } from "../../ui.js"

export function renderAllUserLikedPost(postContainer, article) {
    validatePost(postId)

    const allUserLikesModal = document.createElement('div')
    allUserLikesModal.classList.add('overlay')
    postContainer.append(allUserLikesModal)
    allUserLikesModal.classList.add('all-users-liked')
    
    const allUserLikesContainer = document.createElement('div')
    allUserLikesContainer.classList.add('all-users-liked-container')
    allUserLikesModal.append(allUserLikesContainer)

    const title = document.createElement('h3')
    title.classList.add('title')
    allUserLikesContainer.append(title)
    title.innerText = 'Users liked this post'

    for(let i = 0; i < article.likes.length; i++) {
        const user = article.likes[i]
        returnUserImage(allUserLikesContainer, user, 'showName')
    }

    const close = document.createElement('button')
    close.classList.add('close')
    allUserLikesContainer.append(close)
    close.innerText = 'Close'

    close.onclick = (event) => {
        event.preventDefault
        allUserLikesModal.innerHTML = ''
        addClassOnContainer(allUserLikesModal, 'off')
    }
                            
}