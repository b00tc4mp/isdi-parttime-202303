import { useState } from 'react'

import { DEFAULT_AVATAR_URL } from '../constans'
import { context } from '../ui.js'
import retrieveUser from '../logic/retrieveUser'
import formatLikes from '../logic/helpers/utils.js'
import toggleLikePost from '../logic/toggleLikePost.js'
import toggleSavePost from '../logic/toggleSavePost.js'

export default function Post ({ currentUser, post }) {
  const postAuthor = retrieveUser(post.author)

  const [isLiked, setIsLiked] = useState(post.likes && post.likes.includes(context.userId))
  const [isSaved, setIsSaved] = useState(currentUser.saves && currentUser.saves.includes(post.id))
  const [likeText, setLikeText] = useState(formatLikes(post))

  function handleLikePost () {
    try {
      const _post = toggleLikePost(context.userId, post.id)
      setIsLiked(!isLiked)
      setLikeText(formatLikes(_post))
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleSavePost () {
    try {
      toggleSavePost(context.userId, post.id)
      setIsSaved(!isSaved)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <article data-id={post.id}>
      <div className='user-container-post'>
        <img className='post-avatar' src={postAuthor.avatar ? postAuthor.avatar : DEFAULT_AVATAR_URL} />
        <p className='post-user'>{postAuthor.name}</p>
      </div>
      <div className='image-container-post'>
        <img className='post-image' src={post.image} />
      </div>
      <div className='likes-saves-container'>
        <span className={`material-symbols-outlined likes ${isLiked ? 'fill' : 'unfill'}`} onClick={handleLikePost}>favorite</span>
        <p className='count-likes'>{likeText}</p>
        <span
          className={`material-symbols-outlined saves ${isSaved ? 'fill' : 'unfill'}`} onClick={handleSavePost}
        >bookmark
        </span>
      </div>
      <time className='post-date'>{post.date.toLocaleString('en-GB')}</time>
      <p className='post-text'>{post.text}</p>
      {
      post.author === context.userId && <button className='edit-post-button button'>EDIT</button>
    }
    </article>
  )
}
