import { createdPosts, homePage } from "../pages/home-page.js"
import { retrievePost } from "./retrieve-post.js"
import { addOffClass, context, removeOffClass } from "../ui.js"
import { selectPost, unselectPost } from "../logic/select-post.js"
import { updatePost } from "./update-post.js"
import { likePost } from "./like-post.js"
import { users } from "../data.js"

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
      const underImage = document.createElement('div')
      const likeIcon = document.createElement('i')
      const likesInPost = document.createElement('p')
      const datePost = document.createElement('p')
      const textPost = document.createElement('p')
      const avatarAuthor = document.createElement('div')
      const avatarAuthorPost = document.createElement('img')
      const postAuthor = document.createElement('p')

      avatarAuthor.append(avatarAuthorPost, postAuthor)
      underImage.append(likeIcon, likesInPost, datePost)
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
      likeIcon.classList.add('heart-icon', 'off')
      likesInPost.classList.add('likes-post', 'off')

      const user = users.find(user => user.id === post.author)
      avatarAuthorPost.src = user.avatar
      postAuthor.textContent = post.author
      userPost.id = post.id
      imagePost.src = post.image
      textPost.textContent = post.text
      datePost.textContent = post.date
      likeIcon.innerHTML = `<svg class="icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4454 20.7608L3.57617 12.5663C1.35964 10.2582 1.49922 6.4736 3.87922 4.34929C6.24035 2.24181 9.82044 2.65105 11.6863 5.24171L12 5.67724L12.3137 5.24171C14.1796 2.65105 17.7596 2.24181 20.1208 4.34929C22.5008 6.4736 22.6404 10.2582 20.4238 12.5663L12.5546 20.7608C12.2483 21.0797 11.7517 21.0797 11.4454 20.7608Z" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
      likesInPost.textContent = '0 likes'

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
            updatePost(context.userId, context.postId, postImageUrl, postText)
            renderPost()
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
        removeOffClass(likeIcon)
        removeOffClass(likesInPost)
        underImage.classList.add('under-image-big-post')
      })
      
      closePostButton.addEventListener('click', ()=>{
        unselectPost(context.postId)
        addOffClass(likeIcon)
        addOffClass(likeIcon)
        addOffClass(likesInPost)
        underImage.classList.remove('under-image-big-post')
      })

      likeIcon.onclick = function () {likePost(context.userId, context.postId, userPost)}

      createdPosts.appendChild(postContainer)
    })

    return true

  } catch (error) {
    alert('Sorry, something went wrong.')
    console.log(error);
    return false
  }
}