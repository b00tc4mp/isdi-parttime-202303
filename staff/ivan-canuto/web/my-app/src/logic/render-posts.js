import { createdPosts } from "../pages/home-page.js"
import { retrievePosts } from "./retrieve-posts.js"
import { context } from "../ui.js"
import { users } from "../data.js"
import initUserPostPanel from "../components/user-post-panel.js"

export const renderPost = ()=>{
  const usersApp = users()
  try {
      const posts = retrievePosts(context.userId)
      createdPosts.innerHTML = ''
      // Esta es la forma declarativa de crear elementos.
    // createdPosts.innerHTML = posts.reduce((accum, post)=>{
    //   return accum + `<div>
    //     <article class="user-post" id="${post.id}">
    //       <img class="image-post" src=${post.image}>
    //       <p class="text-post">${post.text}</p>
    //       <p class="date-post">${post.date}</p>
    //     </article>
    //     <div class="pop-up-window off">
    //       <button class="edit-post-button">Edit post</button>
    //       <button class="close-post-button">Clsose</button>
    //     </div>  
    //   </div>`
    // },'')

    posts.forEach(post => {
      const postContainer = document.createElement('div')
      const userPost = document.createElement('article')
      const imagePost = document.createElement('img')
      const underImage = document.createElement('div')
      const favoriteIcon = document.createElement('i')
      const likeIcon = document.createElement('i')
      const likesInPost = document.createElement('p')
      const datePost = document.createElement('p')
      const textPost = document.createElement('p')
      const avatarAuthor = document.createElement('div')
      const avatarAuthorPost = document.createElement('img')
      const postAuthor = document.createElement('p')

      avatarAuthor.append(avatarAuthorPost, postAuthor)
      underImage.append(favoriteIcon, likeIcon, likesInPost, datePost)
      userPost.append(avatarAuthor, imagePost, underImage, textPost)
      postContainer.appendChild(userPost)

      userPost.classList.add('user-post')
      imagePost.classList.add('image-post')
      textPost.classList.add('text-post')
      datePost.classList.add('date-post')
      avatarAuthor.classList.add('avatar-author-div')
      avatarAuthorPost.classList.add('avatar-author-post')
      postAuthor.classList.add('post-author')
      underImage.classList.add('under-image')
      favoriteIcon.classList.add('favorite-icon', 'off')
      likeIcon.classList.add('heart-icon', 'off')
      likesInPost.classList.add('likes-post', 'off')

      const user = usersApp.find(user => user.id === post.author)
      avatarAuthorPost.src = user.avatar
      postAuthor.textContent = post.author
      userPost.id = post.id
      imagePost.src = post.image
      textPost.textContent = post.text
      datePost.textContent = post.date
      favoriteIcon.innerHTML = `<svg class="fav-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.3607 9.26543H22L15.8197 13.7557L18.1803 21.0211L12 16.5309L5.81966 21.0211L8.18034 13.7557L2 9.26543H9.63932L12 2Z" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
      likeIcon.innerHTML = `<svg class="like-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4454 20.7608L3.57617 12.5663C1.35964 10.2582 1.49922 6.4736 3.87922 4.34929C6.24035 2.24181 9.82044 2.65105 11.6863 5.24171L12 5.67724L12.3137 5.24171C14.1796 2.65105 17.7596 2.24181 20.1208 4.34929C22.5008 6.4736 22.6404 10.2582 20.4238 12.5663L12.5546 20.7608C12.2483 21.0797 11.7517 21.0797 11.4454 20.7608Z" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
      likesInPost.textContent = '0 likes'

      const popUpWindow = document.createElement('div')
      popUpWindow.classList.add('pop-up-window', 'off')
      postContainer.appendChild(popUpWindow)

      
      if (post.author === context.userId) {
        const editPostButton = document.createElement('button')
        editPostButton.classList.add('edit-post-button')
        editPostButton.textContent = 'Edit post'
        popUpWindow.appendChild(editPostButton)
      }

      userPost.addEventListener('click', ()=> initUserPostPanel(userPost, post))
      
      const closePostButton = document.createElement('button')
      closePostButton.classList.add('close-post-button')
      closePostButton.textContent = 'Close'
      popUpWindow.appendChild(closePostButton)

      createdPosts.appendChild(postContainer)
    })

    return true

  } catch (error) {
    alert('Sorry, something went wrong.')
    console.log(error);
    return false
  }
}