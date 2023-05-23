import './Post.css'
import { useState, useContext } from 'react'
import { DEFAULT_AVATAR_URL } from '../constants'
import { context } from '../ui'
import formatLikes from '../logic/helpers/utils'
import toggleLikePost from '../logic/toggleLikePost'
import toggleSavePost from '../logic/toggleSavePost'
import deletePost from '../logic/deletePost'
import togglePrivatizePost from '../logic/privatizePost'
import Context from '../Context'

export default function Post ({ post, onEditPost, onLiked, onSaved, onDeletePost, onPrivatizePost }) {
  const { alert } = useContext(Context)

  const [privateIcon, setPrivateIcon] = useState(post.visibility === 'public' ? 'lock_open' : 'lock')

  const handleLikePost = () => {
    try {
      toggleLikePost(context.userId, post.id, error => {
        if (error) {
          alert(error.message, 'error')

          return
        }
        onLiked()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  const handleSavePost = () => {
    try {
      toggleSavePost(context.userId, post.id, error => {
        if (error) {
          alert(error.message, 'error')

          return
        }

        onSaved()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  const handleEditPost = () => {
    onEditPost(post.id)
  }

  const handleDeletePost = () => {
    try {
      deletePost(context.userId, post.id, error => {
        if (error) {
          alert(error.message, 'error')

          return
        }
        onDeletePost()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  const handlePrivatizePost = () => {
    try {
      togglePrivatizePost(context.userId, post.id, error => {
        if (error) {
          alert(error.message, 'error')

          return
        }

        setPrivateIcon(privateIcon === 'lock' ? 'lock_open' : 'lock')
        onPrivatizePost()
      })
    } catch (error) {
      alert(error.message, 'warn')
    }
  }

  return (
    <article data-id={post.id}>
      <div className='user-container-post'>
        <img className='avatar' src={post.author.avatar ? post.author.avatar : DEFAULT_AVATAR_URL} />
        <p className='post-user'>{post.author.name}</p>
        {
        post.author.id === context.userId && (
          <span className='material-symbols-outlined private' onClick={handlePrivatizePost}>{privateIcon}</span>
        )
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
