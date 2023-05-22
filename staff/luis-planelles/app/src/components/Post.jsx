import deletePost from "../logic/deletePost";
import retrieveUser from "../logic/retrieveUser";
import toggleFavouritePost from "../logic/toggleFavouritePost";
import toggleLikePost from "../logic/toggleLikePost";
import { context } from "../ui";
import './Post.css';

const Post = ({ post: { id, author, authorName, avatar, image, text, date, likes},
                onEdit, 
                onLike,
                onFavourite,
                onDelete,
              }) => {

  let retrievedUser

  try {
    retrievedUser = retrieveUser(context.userId)
    
  } catch (error){
    alert(error.message)
  }    

  const handleEditClick = () =>{
    onEdit(id)
  },

  handleLikeClick = () => {

    try{
      toggleLikePost(id, context.userId)

      onLike()
    } catch(error) {
      alert(error.message)
    }
  },

  handleFavouriteClick = () => {
    try{
      toggleFavouritePost(id, context.userId)

      onFavourite()
    } catch(error) {
      alert(error.message)
    }
  },

  handleDeletePost = () => {
    try {
        deletePost(context.userId, id)

        onDelete()
        alert('post deleted')
    } catch (error) {
        alert(error.message)
    }
  };

  return (
      <article className='posts-users'>
        <div className='post-header'>
          <img className='post-avatar' src={avatar} />
          <p className='post-author'>{authorName}</p>
          {context.userId === author && (
          <>
            <button className='button-delete' onClick={handleDeletePost}>
              <i className='fas fa-trash'></i> 
            </button>
            <button className='button-edit' onClick={handleEditClick}>
              <i className='far fa-pen'></i> 
            </button>
          </>
        )}
        </div>
        <img className='post-image' src={image} />
        <div className='post-image-footer'>
          <button className='button-like' onClick={handleLikeClick}>
          {likes && likes.includes(retrievedUser.name) 
            ? <i className='fa fa-heart'></i> 
            : <i className='far fa-heart'></i>} 
          </button>

          <button className='button-favourites' onClick={handleFavouriteClick}>
          {retrievedUser.favourites && retrievedUser.favourites.includes(id) 
            ? <i className='fas fa-bookmark'></i> 
            : <i className='far fa-bookmark'></i>
          } 
          </button>
        </div>
        <div className='post-likes-info'>
         <p className='likes-count'>{likes ? likes.length : 0}</p> 
         <p className='likes-users'>{likes ? likes.join(', ') : ''}</p>
        </div>
        <p className='post-text'>{text}</p>
        <time>{date.toLocaleString()}</time>
      </article>
  );
}

export default Post