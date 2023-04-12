import { createdPosts } from "../pages/home-page.js"
import { retrievePost } from "./retrieve-post.js"
import { context } from "../ui.js"

export const renderPost = (postUrl, postText, postId)=>{
  const posts = retrievePost(context.userId)

    // Esta es la forma declarativa de crear elementos.
  createdPosts.innerHTML = posts.reduce((accum, post)=>{
    return accum + `<div class="post-page>
    <article class="user-post" id=" ${post.id}">
      <img class="image-post" src=${post.image}>
      <p class="text-post">${post.text}</p>
      <p class="date-post">${post.date}</p>
      </article>
    </div>`
  },'')

  const allPosts = createdPosts.querySelectorAll('.user-post')
  allPosts.forEach(post => {
    post.addEventListener('click', ()=>{
      // postsPage.classList.toggle('dark-background')
      post.classList.toggle('bigger-post')
    })
  })
  
    // Este es la forma imperativa de crear elementos.
  // const userPost = document.createElement('article')
  // userPost.id = postId
  // const imagePost = document.createElement('img')
  // const textPost = document.createElement('p')
  // userPost.classList.add('user-post')
  // imagePost.classList.add('image-post')
  // textPost.classList.add('text-post')
  // userPost.appendChild(imagePost)
  // userPost.appendChild(textPost)

  // imagePost.src = postUrl
  // textPost.textContent = postText

  // createdPosts.appendChild(userPost)
}