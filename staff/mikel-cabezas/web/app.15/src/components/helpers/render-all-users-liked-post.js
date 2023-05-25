import { returnUserImage } from "../../logic/users/get-user-image.js"
import { addClassOnContainer } from "../../ui.js"
import { validatePost } from "../../logic/helpers/validators.js"

export default function renderAllUserLikedPost(postContainer, article) {
    validatePost(article.id)

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
        event.preventDefault()
        event.stopPropagation()
        allUserLikesModal.innerHTML = ''
        addClassOnContainer(allUserLikesModal, 'off')
    }
                            
}