import { users, saveUsers } from '../data.js'

export const saveFavoritePost = (userId, postId, renderedPost)=>{
  const user = users.find(user => user.id === userId)
  const favIcon = renderedPost.querySelector('.favorite-icon')

  if(!user.favPosts.includes(postId)) {
    favIcon.innerHTML = ''
    favIcon.textContent = '⭐'
    user.favPosts.push(postId)
  } else {
    favIcon.textContent = ''
    favIcon.innerHTML = `<svg class="fav-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.3607 9.26543H22L15.8197 13.7557L18.1803 21.0211L12 16.5309L5.81966 21.0211L8.18034 13.7557L2 9.26543H9.63932L12 2Z" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
    const indexIcon = user.favPosts.indexOf(postId)
    user.favPosts.splice(indexIcon, 1)
  }
  saveUsers()
}