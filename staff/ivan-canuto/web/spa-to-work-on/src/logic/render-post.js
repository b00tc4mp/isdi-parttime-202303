import { createdPosts, homePage } from "../pages/home-page.js"
import { retrievePost } from "./retrieve-post.js"
import { addOffClass, context, removeOffClass } from "../ui.js"
import { selectPost, unselectPost } from "../logic/select-post.js"
import { retrieveUser } from "./retrieve-user.js"
import { updatePost } from "./update-post.js"

export const renderPost = ()=>{
  try {

      const posts = retrievePost(context.userId)
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
      const textPost = document.createElement('p')
      const datePost = document.createElement('p')
      const avatarAuthor = document.createElement('div')
      const avatarAuthorPost = document.createElement('img')
      const postAuthor = document.createElement('p')

      postContainer.appendChild(userPost)
      avatarAuthor.append(avatarAuthorPost, postAuthor)
      userPost.append(avatarAuthor, imagePost, textPost, datePost)

      userPost.classList.add('user-post')
      imagePost.classList.add('image-post')
      textPost.classList.add('text-post')
      datePost.classList.add('date-post')
      avatarAuthor.classList.add('avatar-author-div')
      avatarAuthorPost.classList.add('avatar-author-post')
      postAuthor.classList.add('post-author')

      const user = retrieveUser(context.userId)

      avatarAuthorPost.src = user.avatar
      postAuthor.textContent = user.name
      userPost.id = post.id
      imagePost.src = post.image
      textPost.textContent = post.text
      datePost.textContent = post.date

      const popUpWindow = document.createElement('div')
      popUpWindow.classList.add('pop-up-window', 'off')
      postContainer.appendChild(popUpWindow)
      
      if (post.author === context.userId) {
        const editPostButton = document.createElement('button')
        const editPostPage = homePage.querySelector('.edit-post')
        const editPostForm = homePage.querySelector('.edit-post-form')
        editPostButton.classList.add('edit-post-button')
        editPostButton.textContent = 'Edit post'
        popUpWindow.appendChild(editPostButton)

        editPostButton.onclick = function () {
          unselectPost(context.postId)
          context.postId = post.id
          removeOffClass(editPostPage)
          editPostForm.querySelector('input').value = post.image
          editPostForm.querySelector('textarea').value = post.text
        }
        
        editPostForm.addEventListener('submit', (e)=>{
          e.preventDefault()

          let postImageUrl = editPostForm.querySelector('input').value
          let postText = editPostForm.querySelector('textarea').value

          try {
            updatePost(context.postId, postImageUrl, postText)
            renderPost()
            // homePage.querySelector('.edit-post-form').reset()
            addOffClass(editPostPage)
            selectPost(context.postId)  
          } catch (error) {
            alert(error.message)
          }
        })

        editPostPage.querySelector('.cancel-button').onclick = function () {
          homePage.querySelector('.edit-post-form').reset()
          addOffClass(editPostPage)
          selectPost(context.postId)
        }
      }
      
      const closePostButton = document.createElement('button')
      closePostButton.classList.add('close-post-button')
      closePostButton.textContent = 'Close'
      popUpWindow.appendChild(closePostButton)

      userPost.addEventListener('click', ()=>{
        selectPost(post.id)
      })

      closePostButton.addEventListener('click', ()=>{
        unselectPost(context.postId)
      })

      createdPosts.appendChild(postContainer)
    })

    return true

  } catch (error) {

    alert(error.message)
    return false
  }
}