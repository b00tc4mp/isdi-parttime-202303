import './Post.css'
import { DEFAULT_AVATAR_URL } from '../constants'
import { context } from '../ui'
import formatLikes from '../logic/helpers/utils'
import toggleLikePost from '../logic/toggleLikePost'
import toggleSavePost from '../logic/toggleSavePost'
import deletePost from '../logic/deletePost'

export default function Post ({ post, onEditPost, onLiked, onSaved, onDeletePost }) {
  const handleLikePost = () => {
    try {
      toggleLikePost(context.userId, post.id, error => {
        if (error) {
          console.log(error.message)

          return
        }
        onLiked()
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSavePost = () => {
    try {
      toggleSavePost(context.userId, post.id, error => {
        if (error) {
          console.log(error.message)

          return
        }

        onSaved()
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEditPost = () => {
    onEditPost(post)
  }

  const handleDeletePost = () => {
    try {
      deletePost(context.userId, post.id, error => {
        if (error) {
          console.log(error.message)

          return
        }
        onDeletePost()
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <article data-id={post.id}>
      <div className='user-container-post'>
        <img className='avatar' src={post.author.avatar ? post.author.avatar : DEFAULT_AVATAR_URL} />
        <p className='post-user'>{post.author.name}</p>
        {
        post.author.id === context.userId &&
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
          className={`material-symbols-outlined saves ${post.saves ? 'fill' : 'unfill'}`} onClick={handleSavePost}
        >bookmark
        </span>
      </div>
      <time className='post-date'>{post.date.toLocaleString('en-GB')}</time>
      <p className='post-text'>{post.text}</p>
      {
        post.author.id === context.userId &&
          <div className='edit-delete-container-post'>
            <button className='button reverse-color icon-button edit-post-button' onClick={handleEditPost}>
              <span className='material-symbols-outlined edit'>
                stylus
              </span>
            </button>
            <button className='button reverse-color icon-button delete-post-button' onClick={handleDeletePost}>
              <span className='material-symbols-outlined delete'>
                delete
              </span>
            </button>
          </div>
      }
    </article>
  )
}
