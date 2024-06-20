import { context } from "../ui";
import { toggleLikePost } from "../logic/toggleLikePost";
import { saveFavoritePost } from "../logic/saveFavoritePost";
import { findUserById } from "../logic/helpers/dataManager";
import deletePost from  "../logic/deletePost"
import Comments from "./Comments";
import { useState } from "react";
import './components-styles/Post.css'


export default function Post(props) {

  const [modal, setModal] = useState('post')

  const handleDeletePost = (postId) => {
    try {
      deletePost(postId, context.userId)
      props.handleRefreshPosts()
    
    } catch (error) {
      alert(error)
      console.log(error.stack);
    }
  }

  const handleCloseCommentModal = () => {
    setModal('post')
    props.handleRefreshPosts()
  }

  const handleToggleLikeFav = () => {
    props.handleRefreshPosts()
  }

  const handlePostScroll = (event) => {
    const post = event.target

    if(post.scrollTop + post.offsetHeight >= post.scrollHeight) {
      post.scrollTop = post.scrollHeight
      event.stopPropagation()
    }
  }

    try {
      
      const { image, id, likes, date, text, author, comments } = props.post
      const user = findUserById(context.userId)
      const postAuthor = findUserById(author)

      return <article className="user-post" id={id} onScroll={handlePostScroll}>
      {modal === 'post' && <>
        <div className="above-image">
          <div>
            <img className="post-user-avatar" src={postAuthor.avatar} alt="post-user-avatar" />
            <p className="post-user-name">{postAuthor.name}</p>
          </div>

          {(author === user.id) && 
          <div>
            <button className="edit-post-button" onClick={() => {
              context.postId = id
              props.handleOpenEditPost()}
              }><span className="material-symbols-outlined">edit</span></button>
            <button className="delete-post-button" onClick={() => handleDeletePost(props.post)}><span className="material-symbols-outlined">delete</span></button>
          </div>}
        </div>

        <div className="image-container">
          <img className="image-post" src={image}/>
        </div>

        <div className="under-image">
          <i className="favorite-icon" onClick={() => {
            saveFavoritePost(context.userId, props.post)
            handleToggleLikeFav()
            }}>{(!user.favPosts || !user.favPosts.includes(id))? <span className="material-symbols-outlined">bookmark</span> : <span className="material-symbols-outlined saved filled">bookmark</span>}</i>

          <span className="material-symbols-outlined comment-icon" onClick={() => {
            context.postId = id
            setModal('comments')
            }}>mode_comment</span>
          
          <i className="heart-icon" onClick={() => {
            toggleLikePost(context.userId, props.post)
            handleToggleLikeFav()
          }}>{(!likes || !likes.includes(context.userId))? <span className="material-symbols-outlined">favorite</span> : <span className="material-symbols-outlined filled liked">favorite</span>}</i>

          <p className="likes-post">{likes ? likes.length + ' likes' : '0 likes'}</p>
          <p className="date-post">{date}</p>
        </div>

        <p className="text-post">{text}</p>
      </>}
      
      {modal === 'comments' && <Comments
        handleRefreshPosts={props.handleRefreshPosts}
        onCloseCommentModal={handleCloseCommentModal}
        post={props.post}
        // addRemoveButton={modal === 'addComment' ? true : false}
      />}
    </article>
    
    } catch (error) {
      alert(error)
      console.log(error.stack);
    }
  
} 