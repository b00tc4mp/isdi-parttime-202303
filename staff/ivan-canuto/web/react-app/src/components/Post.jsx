import React from "react";
import { context } from "../ui";
import { toggleLikePost } from "../logic/toggleLikePost";
import { saveFavoritePost } from "../logic/saveFavoritePost";
import { findUserById } from "../logic/helpers/dataManager";
import EditPost from "./EditPostModal";
import deletePost from  "../logic/deletePost"
import { users } from "../data";
import Comments from "./Comments";

export default class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = { modal: null , comments: false}
  }

  handleOpenEditPost = () => {
    document.body.classList.add('fixed-scroll')
    this.setState({ modal: 'editPost' })
  }

  handleCloseEditPost = () => {
    document.body.classList.remove('fixed-scroll')
    this.setState({ modal: null})
  }

  handleRender = () => {
    this.props.handleRender()
  }
  
  handleDeletePost = () => {
    deletePost()
    this.props.handleRender()
  }

  handleAddComment = () => {
    this.setState({ modal: 'addComment' })
  }

  handleCloseAddComment = () => {
    this.setState({ modal: null })
  }

  
  render() {
      const { image, id, likes, date, text, author, comments } = this.props.post
      const user = findUserById(context.userId)

      return <article className="user-post" id={id}>
      {!this.state.comments && <>
        <div className="above-image">
          <div>
            <img className="post-user-avatar" src={users().find(user => user.id === author).avatar} alt="post-user-avatar" />
            <p className="post-user-name">{users().find(user => user.id === author).name}</p>
          </div>

          {(author === user.id) && 
          <div>
            <button className="edit-post-button" onClick={() => {
              context.postId = id
              this.handleOpenEditPost()
            }}>Edit post</button>
            <button className="delete-post-button" onClick={() => {
              context.postId = id
              this.handleDeletePost()
            }}>Delete post</button>
          </div>}

          {this.state.modal === 'editPost' && <EditPost
          onCloseModal={this.handleCloseEditPost}
          renderPosts={this.handleRender}
          />}
        </div>

        <div className="image-container">
          <img className="image-post" src={image}/>
        </div>

        <div className="under-image">
          <i className="favorite-icon" onClick={() => {
            saveFavoritePost(context.userId, id)
            }}>{(user.favPosts.includes(id))? <span className="material-symbols-outlined saved filled">star</span> : <span className="material-symbols-outlined">star</span>}</i>

          <span className="material-symbols-outlined comment-icon" onClick={() => {
            context.postId = id
            this.setState({ comments: true })
            }}  >mode_comment</span>
          
          <i className="heart-icon" onClick={() => {
            toggleLikePost(context.userId, id)
            this.handleRender()
          }}>{(likes.includes(context.userId))? <span className="material-symbols-outlined filled liked">favorite</span> : <span className="material-symbols-outlined">favorite</span>}</i>

          <p className="likes-post">{likes.length} likes</p>
          <p className="date-post">{date}</p>
        </div>

        <p className="text-post">{text}</p>
      </>}
      
      {this.state.comments && <Comments
        onCancelAddComment={this.handleCloseAddComment}
        onClickAddComment={this.handleAddComment}
        addRemoveButton={this.state.modal === 'addComment' ? true : false}/>}
    </article>
  }
} 