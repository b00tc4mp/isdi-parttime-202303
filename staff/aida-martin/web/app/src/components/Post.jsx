import { DEFAULT_AVATAR_URL } from '../constans'
import { context } from '../ui.js'
import retrieveUser from '../logic/retrieveUser'
import formatLikes from '../logic/helpers/utils.js'

export default function Post ({ currentUser, post }) {
  const postAuthor = retrieveUser(post.author)

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
        <span className={`material-symbols-outlined likes ${post.likes && post.likes.includes(context.userId) ? 'fill' : 'unfill'}`}>favorite</span>
        <p className='count-likes'>{formatLikes(post)}</p>
        <span className={`material-symbols-outlined saves ${currentUser.saves && currentUser.saves.includes(post.id)
        ? 'fill'
        : 'unfill'}`}
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
