import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import toggleSavePost from "../logic/toggleSavePost"
import deletePost from  "../logic/deletePost"
import Comments from "./Comments"
import { useState } from "react"
import './components-styles/Post.css'
import toggleVisibilityPost from "../logic/toggleVisibilityPost"
import removePostFromSale from "../logic/removePostFromSale"


export default function Post({post, handleOpenEditPost, handleRefreshPosts, handleOpenPostpriceModal, handleOpenBuyPostModal}) {

  const [modal, setModal] = useState('post')

  const { image, id, likes, date, text, author, visible, onSale } = post

  const handleDeletePost = (postId) => {
    try {
      deletePost(postId, context.userId, (error) => {
        if(error) {
          alert(error)
          console.log(error.stack)

          return
        }
        
        handleRefreshPosts()
      })
    
    } catch (error) {
      alert(error)
      console.log(error.stack);
    }
  }

  const handleCloseCommentModal = () => {
    setModal('post')
    handleRefreshPosts()
  }

  const handleToggleLikeFav = () => {
    handleRefreshPosts()
  }

  const handlePostScroll = (event) => {
    const post = event.target

    if(post.scrollTop + post.offsetHeight >= post.scrollHeight) {
      post.scrollTop = post.scrollHeight
      event.stopPropagation()
    }
  }

  const toggleVisibility = () => {
    toggleVisibilityPost(post, (error) => {
      if(error) {
        alert(error.message)
        console.log(error.stack)
        return
      }

      handleRefreshPosts()
    })
  }

  const toggleSellPost = () => {

    if(onSale) removePostFromSale(id, (error) => {
      if(error) {
        alert(error.message)
        console.log(error.stack)
        return
      }

      handleRefreshPosts()
    })
    else handleOpenPostpriceModal()
  }

  console.log('Post -> render')

    return <article className="user-post" id={id} onScroll={handlePostScroll}>
    {modal === 'post' && <>
      <div className="above-image">
        <div>
              <img className="post-user-avatar" src={author.avatar} alt="post-user-avatar" />
              <p className="post-user-name">{author.name}</p>
        </div>
        <div>
        {(author.id === context.userId) && <>
            <button className="toggle_visible_button"><span onClick={toggleVisibility} title={visible ? 'Set post not visible' : 'Set post visible'} className="material-symbols-outlined">{visible ? 'lock_open_right' : 'lock'}</span></button>
            <button className="edit-post-button" onClick={() => {
              context.postId = id
              handleOpenEditPost()}
            }><span className="material-symbols-outlined">edit</span></button>
            <button className="delete-post-button" onClick={() => handleDeletePost(post)}><span className="material-symbols-outlined">delete</span></button>
            <button className="sell-post-button" onClick={() => {
              if (onSale !== 'Sold') {
                context.postId = id
                toggleSellPost()
              }
            }}>
              <span className="material-symbols-outlined">local_mall</span>
              {(onSale && onSale !== 'Sold') && `${onSale}€`}
              {!onSale && 'Put on sale'}
              {onSale === 'Sold' && 'Post sold'}
            </button>
          </>
        }

        {(author.id !== context.userId && onSale) &&
          <button className="sell-post-button" title="Post on sale" onClick={() => {
            if(onSale !== 'Sold') {
              context.postId = id
              handleOpenBuyPostModal()
            }
          }}>
            <span className="material-symbols-outlined">local_mall</span>
            {onSale !== 'Sold' && `${onSale}€`}
            {onSale === 'Sold' && `Post sold`}
          </button>}
        </div>
      </div>

      <div className="image-container">
        <img className="image-post" src={image}/>
      </div>

      <div className="under-image">
        <i className="favorite-icon" onClick={() => {
            toggleSavePost(context.userId, post, (error) => {
              if (error) {
                alert(error.message)
                console.log(error.stack)
                return
              }

              handleToggleLikeFav()
            })
          }}>{(!author.favs.includes(id))? <span className="material-symbols-outlined">bookmark</span> : <span className="material-symbols-outlined saved filled">bookmark</span>}
        </i>

        <span className="material-symbols-outlined comment-icon" onClick={() => {
          context.postId = id
          setModal('comments')
          }}>mode_comment</span>
        
        <i className="heart-icon" onClick={() => {
          toggleLikePost(context.userId, id, (error) => {
            if (error) {
              alert(error.message)
              console.log(error.stack);
              return
            }
            
            handleToggleLikeFav()
          })
        }}>{(!likes || !likes.includes(context.userId))? <span className="material-symbols-outlined">favorite</span> : <span className="material-symbols-outlined filled liked">favorite</span>}</i>

        <p className="likes-post">{likes ? likes.length + ' likes' : '0 likes'}</p>
        <p className="date-post">{date}</p>
      </div>

      <p className="text-post">{text}</p>
    </>}
    
    {modal === 'comments' && <Comments
      handleRefreshPosts={handleRefreshPosts}
      onCloseCommentModal={handleCloseCommentModal}
      post={post}
    />}
  </article>

} 