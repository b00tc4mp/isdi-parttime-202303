import { createdPosts } from "../pages/home-page.js"
import { retrievePosts } from "./retrieve-posts.js"
import { context } from "../ui.js"
import { users } from "../data.js"
import initUserPostPanel from "../components/user-post-panel.js"

export const renderPosts = ()=>{
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
      favoriteIcon.innerHTML = `<span class="material-symbols-outlined">star</span>`
      likeIcon.innerHTML = `<span class="material-symbols-outlined">favorite</span>`
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

      userPost.addEventListener('click', ()=> {
        document.body.classList.add('fixed-scroll')
        initUserPostPanel(userPost, post)
      })
      
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