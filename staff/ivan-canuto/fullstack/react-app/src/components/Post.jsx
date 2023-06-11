import { useState } from "react"
import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import toggleSavePost from "../logic/toggleSavePost"
import Comments from "./Comments"
import './components-styles/Post.css'
import ContextualMenu from "./ContextualMenuModal"
import Button from "../library/Button";
import { useAppContext } from "../hooks"

export default function Post({post, handleRefreshPosts, handleOpenEditPost, handleOpenDeletePost, handleToggleVisibility, handleToggleOnSalePost, handleOpenBuyPost }) {
  
  const [modal, setModal] = useState('post')
  const [contextualMenu, setContextualMenu] = useState('close')
  
  const { alert, freeze, unfreeze } = useAppContext()
  const { image, id, likes, date, text, author, visible, onSale } = post

  const handleCloseCommentModal = () => {
    setModal('post')
    handleRefreshPosts()
  }

  const handleToggleLike = () => {
    try {
      freeze()
      
      toggleLikePost(context.userId, id, (error) => {
        unfreeze()

        if (error) {
          alert(error.message)
          console.debug(error.stack)

          return
        }
        
        handleRefreshPosts()
      })

    } catch (error) {
      alert(error.message)
      console.debug(error.stack)
    }
  }

  const handleToggleFav = () => {
    try {
      freeze()

      toggleSavePost(context.userId, id, (error) => {
        unfreeze()

        if (error) {
          alert(error.message)
          console.debug(error.stack)

          return
        }
        
        handleRefreshPosts()
      })
      
    } catch (error) {
      alert(error.message)
      console.debug(error.stack)
    }
  }

  const handlePostScroll = (event) => {
    const post = event.target

    if(post.scrollTop + post.offsetHeight >= post.scrollHeight) {
      post.scrollTop = post.scrollHeight
      event.stopPropagation()
    }
  }

  const toggleContextualMenu = () => {
    context.postId = id
    document.body.classList.toggle('fixed-scroll')
    setContextualMenu(contextualMenu === 'close' ? 'open' : 'close')
  }

  console.debug('Post -> render')

    return <>
    <article className="user-post" id={id} onScroll={handlePostScroll}>

      {contextualMenu === 'open' &&  <ContextualMenu
        options={[
          {text: 'Edit post', onClick: handleOpenEditPost},
          {text: 'Delete post', onClick: handleOpenDeletePost},
          {text: `Set post ${visible ? 'private' : 'public'}`, onClick: handleToggleVisibility},
          {text: `${!onSale ? 'Set post on sale' : onSale !== 'Sold' ? 'Remove post form sale' : 'Sold post'}`, onClick: onSale !== 'Sold' ? handleToggleOnSalePost : undefined}
        ]}
        toggleContextualMenu={toggleContextualMenu}
      />}
      
      {modal === 'post' && <>
        <section className="above-image">
          <div>
            <img className="post-user-avatar" src={author.avatar} alt="post-user-avatar" />
            <p className="post-user-name text-base">{author.name}</p>
          </div>
          
          <div>
            {(author.id === context.userId) && <>
              <p>{visible ? 'Public' : 'Private'}</p>
              {(onSale && onSale !== 'Sold') && <>
                <div> 
                  <span className="material-symbols-outlined">local_mall</span>
                  <p>{`${onSale}€`}</p>
                </div>
              </>}
              {(onSale && onSale === 'Sold') && <>
                <div>
                  <span className="material-symbols-outlined">local_mall</span>
                  <p>{`Sold`}</p>
                </div>
              </>}
              <span className="material-symbols-outlined contextual-menu_icon" onClick={toggleContextualMenu}>more_vert</span>
            </>}
            
            {(author.id !== context.userId && onSale) &&
              <div className="sell-post-button" title="Post on sale" onClick={() => {
                if(onSale !== 'Sold') {
                  context.postId = id
                  handleOpenBuyPost()
                }
                }}>
                {onSale !== 'Sold' && <Button><span className="material-symbols-outlined">local_mall</span>{`${onSale}€`}</Button>}
                {onSale === 'Sold' && <p className="text-base flex"><span className="material-symbols-outlined">local_mall</span>Sold</p>}
              </div>}
          </div>
        </section>
        
        <section className="image-container">
          <img className="image-post" src={image}/>
        </section>

        <section className="under-image">
          <i className="favorite-icon" onClick={handleToggleFav}>
              {(!author.favs.includes(id))? <span className="material-symbols-outlined">bookmark</span> : <span className="material-symbols-outlined saved filled">bookmark</span>}
          </i>

          <i>
            <span className="material-symbols-outlined comment-icon" onClick={() => {
              context.postId = id
              setModal('comments')
            }}>mode_comment</span>
          </i>
          
          <i className="heart-icon" onClick={handleToggleLike}>
            {(!likes || !likes.includes(context.userId))? <span className="material-symbols-outlined">favorite</span> : <span className="material-symbols-outlined filled liked">favorite</span>}
          </i>

          <p className="likes-post">{likes ? likes.length + ' likes' : '0 likes'}</p>
          <p className="date-post">{date}</p>
        </section>

        <section className="text-post">{text}</section>
      </>}
      
      {modal === 'comments' && <Comments
        handleRefreshPosts={handleRefreshPosts}
        onCloseCommentModal={handleCloseCommentModal}
        post={post}
      />}
    </article>
  </>
} 