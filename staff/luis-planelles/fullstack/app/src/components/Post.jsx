import { useEffect, useState } from "react";
import { useAppContext } from '../hooks';
import deletePost from "../logic/deletePost";
import retrieveUser from "../logic/retrieveUser";
import toggleFavouritePost from "../logic/toggleFavouritePost";
import toggleLikePost from "../logic/toggleLikePost";
import { context } from "../ui";
import './Post.css';

const Post = ({ post: { id, author, image, likes, favourites, text, date},
  onEdit, 
  onLike,
  onFavourite,
  onDelete,
}) => {
  
  const { alert } = useAppContext()
  const [user, setUser] = useState()

  useEffect(() => {
      try {
          retrieveUser(context.token)
          .then((user) => setUser(user))
          .catch(error => alert(error))
                
            } catch (error) {
                alert(error.message)
      }
  }, [])

  const handleEditPost = () => onEdit(id),
  
  handleLikePost = () => {

    try{
      toggleLikePost(context.token, id)
      .then(()=> onLike())
      .catch(error => alert(error))

    } catch(error) {
      alert(error.message)
    }
  },

  handleFavouritePost = () => {
    try{
      toggleFavouritePost(context.token, id)
      .then(()=> onFavourite())
      .catch(error => alert(error))

    } catch(error) {
      alert(error.message)
    }
  },

  handleDeletePost = () => {
    try {
        deletePost(context.token, id)
        .then(()=> {
          onDelete()
        
          alert('post deleted')
        })
        .catch(error => alert(error))
          

    } catch (error) {
        alert(error.message)
    }
  };
  return (
    <article className='posts-users'>
        <div className='post-header'>
            <img className='post-avatar' src={author.avatar} />
            <p className='post-author'>{author.name}</p>
          {user && user._id == author.id && (
          <>
            <button className='button-delete' onClick={handleDeletePost}>
              <i className='fas fa-trash'></i> 
            </button>
            <button className='button-edit' onClick={handleEditPost}>
              <i className='far fa-pen'></i> 
            </button>
          </>
        )}
        </div>
        <img className='post-image' src={image} />
        <div className='post-image-footer'>
          <button className='button-like' onClick={handleLikePost}>
            {user && likes.includes(user._id) 
              ?  <i className='fa fa-heart'></i>
              :  <i className='far fa-heart'></i>
            }
          </button>
          <button className='button-favourites' onClick={handleFavouritePost}>
            {favourites 
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