import { DEFAULT_AVATAR_URL } from '../constants'
import { context } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import formatLikes from '../logic/helpers/utils'
import toggleLikePost from '../logic/toggleLikePost'
import toggleSavePost from '../logic/toggleSavePost'
import deletePost from '../logic/deletePost'

export default function Post ({ currentUser, post, onEditPost, onLiked, onSaved, onDeletePost }) {
  const postAuthor = retrieveUser(post.author)

  function handleLikePost () {
    try {
      toggleLikePost(context.userId, post.id)
      onLiked()
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleSavePost () {
    try {
      toggleSavePost(context.userId, post.id)
      onSaved()
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleEditPost () {
    onEditPost(post)
  }

  function handleDeletePost () {
    try {
      deletePost(context.userId, post.id)
      onDeletePost()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <article data-id={post.id}>
      <div className='user-container-post'>
        <img className='post-avatar' src={postAuthor.avatar ? postAuthor.avatar : DEFAULT_AVATAR_URL} />
        <p className='post-user'>{postAuthor.name}</p>
        {
        post.author === context.userId &&
          <span className='material-symbols-outlined private'>
            lock_open
          </span>
            }
      </div>
      <div className='image-container-post'>
        <img className='post-image' src={post.image} />
      </div>
      <div className='likes-saves-container'>
        <span className={`material-symbols-outlined likes ${post.likes && post.likes.includes(context.userId) ? 'fill' : 'unfill'}`} onClick={handleLikePost}>favorite</span>
        <p className='count-likes'>{formatLikes(post)}</p>
        <span
          className={`material-symbols-outlined saves ${currentUser.saves && currentUser.saves.includes(post.id) ? 'fill' : 'unfill'}`} onClick={handleSavePost}
        >bookmark
        </span>
      </div>
      <time className='post-date'>{post.date.toLocaleString('en-GB')}</time>
      <p className='post-text'>{post.text}</p>
      {
        post.author === context.userId &&
          <div className='edit-delete-container-post'>
            <button className='edit-post-button button' onClick={handleEditPost}>
              <span className='material-symbols-outlined edit'>
                stylus
              </span>
            </button>
            <button className='delete-post-button button' onClick={handleDeletePost}>
              <span className='material-symbols-outlined delete'>
                delete
              </span>
            </button>
          </div>
      }
    </article>
  )
}
